import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem("token") || null, // Lấy token từ local 
  user: null,
  loading: false,

  setAccessToken: (accessToken) => {
    if (accessToken) {
      localStorage.setItem("token", accessToken); // Lưu token vào máy người dùng để giữ đăng nhập qua các lần tải lại trang
    } else {
      localStorage.removeItem("token");
    }
    set({ accessToken });
  },

  clearState: () => {
    localStorage.removeItem("token");
    set({ accessToken: null, user: null, loading: false });
  },

  signUp: async (username, password, email, firstName, lastName) => {
    try {
      set({ loading: true });
      await authService.signUp(username, password, email, firstName, lastName);
      toast.success("Đăng ký thành công! Mời bạn đăng nhập lại. 🎉");
    } catch (error: any) {
      // ktra lỗi thật từ Backend
      const msg = error.response?.data?.message || "Đăng ký không thành công";
      toast.error(msg);
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (username, password) => {
    try {
      set({ loading: true });
      const response = await authService.signIn(username, password);
      
      // Trap data phòng trường hợp Backend trả về lỗi
      const data = response.data || response;
      const token = data.accessToken || data.token;

      if (!token) throw new Error("Không tìm thấy token trong phản hồi!");

      get().setAccessToken(token);
      await get().fetchMe();

      toast.success("Chào mừng bạn quay lại với LibraMoji 🎉");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Đăng nhập thất bại!";
      toast.error(msg);
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      await authService.signOut();
    } catch (error) {
      console.error("Signout error:", error);
    } finally {
      // các trường hợp server lỗi hay không thì vẫn xóa sạch ở Client cho user logout
      get().clearState();
      toast.success("Logout thành công!");
    }
  },
  
  fetchMe: async () => {
    try {
      set({ loading: true });
      const response = await authService.fetchMe();
      // Thường thì response.data mới chứa user
      const userData = response.data || response;
      set({ user: userData });
    } catch (error) {
      // Nếu lỗi fetchMe (token hết hạn) thì xóa sạch để yêu cầu login lại
      get().clearState();
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    try {
      const accessToken = await authService.refresh();
      get().setAccessToken(accessToken);
      if (!get().user) await get().fetchMe();
    } catch (error) {
      get().clearState();
      toast.error("Phiên làm việc hết hạn!");
    }
  },
}));