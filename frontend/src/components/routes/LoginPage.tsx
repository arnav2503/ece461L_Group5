import LoginForm from "@/components/forms/LoginForm";
import { Toaster } from "@/components/ui/toaster";

function LoginPage() {
    return (
        <>
            <LoginForm />
            <Toaster />
        </>
    );
}

export default LoginPage;
