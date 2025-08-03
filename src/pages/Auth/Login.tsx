import CustomInput from "@/components/form/CustomInput";
import Heading from "@/components/typography/Heading";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import type { FormEvent } from "react";

function Login() {
    const loginForm = useLogin();

    return (
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
                        loginForm.handleSubmit();
                    }}
                >
                    <loginForm.Field
                        name="email"
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
                            />
                        )}
                    />

                    <loginForm.Field
                        name="password"
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
                            />
                        )}
                    />

                    <hr className="border-gray-200 my-4" />

                    <Button
                        type="submit"
                        className="text-md w-full bg-slate-900 text-white py-6 px-4 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition duration-200"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login;