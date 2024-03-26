import LoginForm from "@/components/LoginForm";
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
