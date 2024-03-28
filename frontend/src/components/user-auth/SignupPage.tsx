import SignupForm from "@/components/user-auth/SignupForm";
import { Toaster } from "@/components/ui/toaster";

function SignupPage() {
  return (
    <>
      <SignupForm className="p-10" />
      <Toaster />
    </>
  );
}

export default SignupPage;
