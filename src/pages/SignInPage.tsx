import { SignInForm } from "@/components/auth/signin-form";
export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[gradient-purple] p-6 md:p-10 absolute inset-0 z-0 bg-gradient-purple">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignInForm />
      </div>
    </div>
  );
}
