import { useRouter } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useToast } from "./useToast";
import { useAuth } from "./useAuth";

interface LoginFormValues {
    email: string;
    password: string;
};

const defaultAdmin: LoginFormValues = {
    email: "",
    password: ""
};

const validateEmail = (email: string): string | undefined => {
    if (!email) {
        return "Email is required";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
    }
    
    return undefined;
};

const validatePassword = (password: string): string | undefined => {
    if (!password) {
        return "Password is required";
    }
    return undefined;
};

export const useLogin = () => {
    const { signIn } = useAuth();
    const router = useRouter();
    const { success, error } = useToast();

    const form = useForm({
        defaultValues: defaultAdmin,
        onSubmit: async ({ value }) => {
            try {
                const { error: authError } = await signIn(value.email, value.password);
                
                if (authError) {
                    error("Login failed", {
                        title: "Authentication Error",
                        description: authError || "Invalid email or password. Please try again.",
                        duration: 4000,
                    });
                } else {
                    success("Welcome back!", {
                        title: "Login Successful",
                        description: "Redirecting to dashboard...",
                        duration: 2000,
                    });
                    
                    setTimeout(() => {
                        router.navigate({ to: "/admin" });
                    }, 1000);
                }
            } catch (err) {
                error("An unexpected error occurred", {
                    title: "Login Error",
                    description: "Please try again later.",
                    duration: 4000,
                });
                console.error("Unexpected login error:", err);
            }
        }
    });

    return {
        form,
        validateEmail,
        validatePassword
    };
}