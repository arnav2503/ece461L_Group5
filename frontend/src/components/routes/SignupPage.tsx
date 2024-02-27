import SignupForm from "@/components/forms/SignupForm";
import { Toaster } from "@/components/ui/toaster";

function SignupPage() {
    return (
        <>
            <SignupForm />
            <Toaster />
        </>
    );
}

export default SignupPage;
