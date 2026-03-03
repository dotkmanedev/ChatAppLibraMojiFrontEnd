import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NavLink } from "react-router";

const signUpSchema = z.object({
  firstname: z.string().min(1, "Tên bắt buộc phải có"),
  lastname: z.string().min(1, "Họ bắt buộc phải có"),
  username: z.string().min(3, "Tên đăng nhập bắt buộc phải có"),
  email: z.email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignupFormValues = z.infer<typeof signUpSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (data: SignupFormValues) => {};
  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* header logo */}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="mx-auto block w-fit text-center">
                  <img src="/logo.svg" alt="logo" />
                </a>
                <h1 className="text-2xl font-bold">Tạo tài khoản LibraChat</h1>
                <p className="text-muted-foreground text-balance">
                  chào mừng bạn đến với chatapp
                </p>
              </div>
              {/* họ và tên */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="block text-sm" htmlFor="lastname">
                    Họ
                  </Label>
                  <Input type="text" id="lastname" {...register("lastname")} />
                  {/* error */}
                  {errors.lastname && (
                    <p className="text-destructive">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="block text-sm" htmlFor="firstname">
                    Tên
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                    {...register("firstname")}
                  />
                  {/* error */}
                  {errors.firstname && (
                    <p className="text-destructive">
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
              </div>
              {/* username */}
              <div className="flex flex-col gap-3">
                <Label className="block text-sm" htmlFor="username">
                  Tên Đăng Nhập
                </Label>
                <Input type="text" id="username" {...register("username")} />
                {/* error */}
                {errors.username && (
                  <p className="text-destructive">{errors.username.message}</p>
                )}
              </div>
              {/* email */}
              <div className="flex flex-col gap-3">
                <Label className="block text-sm" htmlFor="email">
                  Email
                </Label>
                <Input
                  type="email "
                  id="email"
                  placeholder="x@gmail.com"
                  {...register("email")}
                />
                {/* error */}
                {errors.email && (
                  <p className="text-destructive">{errors.email.message}</p>
                )}
              </div>
              {/* password */}
              <div className="flex flex-col gap-3">
                <Label className="block text-sm" htmlFor="password">
                  Mật Khẩu
                </Label>
                <Input
                  type="password"
                  id="password"
                  {...register("password")}
                />
                {/* error */}
                {errors.password && (
                  <p className="text-destructive">{errors.password.message}</p>
                )}
              </div>
              {/* đăng ký */}
              <Button className="w-full text-center" type="submit">
                Đăng Ký
              </Button>

              <div className="text-center text-sm">
                Đã có tài khoản?{" "}
                <NavLink to="/signin" className="underline underline-offset-4">
                  Đăng nhập
                </NavLink>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="px-6 text-center *:[a]:hover:text-primary *:[a]:underline *:[a]: underline-offset-4 *:[a]:text-balance">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#"> điều khoản dịch vụ</a>{" "}
        và<a href="#"> chính sách bảo mật</a> của chúng tôi.
      </div>
    </div>
  );
}
