import CustomInput from "@/components/form/CustomInput";
import Heading from "@/components/typography/Heading";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useLogin } from "@/hooks/useLogin";
import type { FormEvent } from "react";

function Login() {
    const {
        validateEmail,
        validatePassword,
        form
    } = useLogin();

    return (
        <>
        <Toaster
            position="bottom-right"
            variant="clean"
        />
        <div 
            className="flex items-center justify-center min-h-[calc(100vh-200px)]"
        >   
            <div 
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-md flex flex-col gap-6"
            >
                <Heading
                    align="center"  
                    content="Hello, Admin!"
                    level={4}
                    size="small"
                    className="pb-6"
                />
                <form
                    className="flex flex-col gap-6 w-full max-w-md"
                    onSubmit={(e: FormEvent<HTMLFormElement>)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                >
                    <form.Field
                        name="email"
                        validators={{
                            onChange: ({ value }) => validateEmail(value),
                            onBlur: ({ value }) => validateEmail(value)
                        }}
                        children={(field) => (
                            <CustomInput
                                label="Email"
                                type="text"
                                placeholder="Enter your email"
                                value={field.state.value}
                                onChange={field.handleChange}
                                onBlur={field.handleBlur}
                                name={field.name}
                                error={field.state.meta.errors?.[0]}
                                className="py-6"
                            />
                        )}
                    />

                    <form.Field
                        name="password"
                        validators={{
                            onChange: ({ value }) => validatePassword(value),
                            onBlur: ({ value }) => validatePassword(value)
                        }}
                        children={(field) => (
                            <CustomInput
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                value={field.state.value}
                                onChange={field.handleChange}
                                onBlur={field.handleBlur}
                                name={field.name}
                                error={field.state.meta.errors?.[0]}
                                className="py-6"
                            />
                        )}
                    />

                    <hr className="border-gray-200 my-4" />

                    <Button
                        type="submit"
                        disabled={!form.state.canSubmit}
                        className="text-md w-full bg-slate-900 text-white py-6 px-4 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition duration-200"
                    >
                        {form.state.isSubmitting ? "Signing in..." : "Login"}
                    </Button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;