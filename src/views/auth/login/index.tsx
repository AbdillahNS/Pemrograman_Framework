import Link from "next/link";
import style from "../../auth/login/login.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";

const TampilanLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { push, replace, query } = useRouter();

    const callbackUrl =
        typeof query.callbackUrl === "string" ? query.callbackUrl : "/";
    const [error, setError] = useState("");
    const handleSubmit = async (event: any)=> {
        event.preventDefault();
        setError("");
        setIsLoading(true);
        
        // const form = event.currentTarget;
        // const formData = new FormData(event.currentTarget);
        // const email = ((formData.get("email") as string) || "").trim();
        // const password = (formData.get("Password") as string) || "";

        // if (!email) {
        //     setIsLoading(false);
        //     setError("Email wajib diisi");
        //     return;
        // }

        // if (password.length < 6) {
        //     setIsLoading(false);
        //     setError("Password minimal 6 karakter");
        //     return;
        // }

        // const response = await fetch("/api/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ email, password }),
        // });
        // const result = await response.json();
        // if (response.status === 200) {
        //     form.reset();
        //     setIsLoading(false);
        //     push("/auth/login");
        // } else {
        //     setIsLoading(false);
        //     setError(result.name || "An error occurred");
        // }
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.Password.value,
                callbackUrl,
            });

            // console.log("signIn response:", res);
            if (res?.ok) {
                setIsLoading(false);
                replace(res.url || callbackUrl);
            } else {
                setIsLoading(false);
                setError(res?.error || "Login failed");
            }
        } catch (error) {
            setIsLoading(false);
            setError("wrong email or password");
        }
    };
    
    return (
        <div className={style.login}>
                {error && <p className={style.login__error}>{error}</p>}
            <h1 className={style.login__title}>Halaman Login</h1>
            <div className={style.login__form}>
                <form onSubmit={handleSubmit}>
                    <div className={style.login__form__item}>
                        <label
                            htmlFor="email"
                            className={style.login__form__item__label}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                            className={style.login__form__item__input}
                        />
                    </div>
                    
                    <div className={style.login__form__item}>
                        <label
                            htmlFor="Password"
                            className={style.login__form__item__label}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="Password"
                            name="Password"
                            placeholder="Password"
                            minLength={6}
                            required
                            className={style.login__form__item__input}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className={style.login__form__item__button}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "login"}
                    </button>{" "}
                    <br /> <br />
                    <button
                        type="button"
                        onClick={() => signIn("google", { callbackUrl })}
                        className={style.login__form__item__button}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Sign in with Google"}    

                    </button>
                    <br /> <br />
                    <button
                        type="button"
                        onClick={() => signIn("github", { callbackUrl })}
                        className={style.login__form__item__button}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Sign in with GitHub"}

                    </button>
                </form>
                <br />
                <p className={style.login__form__item__text}>
                    tidak punya {""} akun?<Link href="/auth/register">Ke Halaman Register</Link>
                </p>
            </div>
        </div>
    );
};

export default TampilanLogin;