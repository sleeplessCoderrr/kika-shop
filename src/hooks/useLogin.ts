import { useRouter } from "@tanstack/react-router";
import { supabase } from "@/api/clients/supabase";
import { useForm } from "@tanstack/react-form";
import { useToast } from "./useToast";

interface LoginFormValues {
    email: string;
    password: string;
}

const defaultValues: LoginFormValues = {
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
    const router = useRouter();
    const { success, error } = useToast();

    const form = useForm({
        defaultValues,
        onSubmit: async ({ value }) => {
            try {
                const { data, error: authError } = await supabase.auth.signInWithPassword({
                    email: value.email,
                    password: value.password,
                })
                
                if (authError || !data.user || !data.session) {
                    error("Login failed", {
                        title: "Authentication Error",
                        description: authError?.message || "Invalid credentials. Please try again.",
                        duration: 4000,
                    })
                    return
                }

                // Check if user is admin (optional - for admin routes)
                const userRole = data.user.user_metadata?.role || data.user.app_metadata?.role
                if (userRole === 'admin') {
                    success("Welcome back, Admin!", {
                        title: "Login Successful",
                        description: "Redirecting to admin dashboard...",
                        duration: 2000,
                    })
                    
                    setTimeout(() => {
                        router.navigate({ to: "/admin" })
                    }, 1000)
                } else {
                    success("Welcome back!", {
                        title: "Login Successful",
                        description: "Redirecting to dashboard...",
                        duration: 2000,
                    })
                    
                    setTimeout(() => {
                        router.navigate({ to: "/" })
                    }, 1000)
                }
                
            } catch (err) {
                error("An unexpected error occurred", {
                    title: "Login Error",
                    description: "Please check your connection and try again.",
                    duration: 4000,
                })
                console.error("Login error:", err)
            }
        }
    });

    return {
        form,
        validateEmail,
        validatePassword
    };
};