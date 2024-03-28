import LoginForm from "@/components/user-auth/LoginForm";
import { Toaster } from "@/components/ui/toaster";

function LoginPage() {
  return (
    <>
      <LoginForm className="p-10" />
      <Toaster />
    </>
  );
}

export default LoginPage;
