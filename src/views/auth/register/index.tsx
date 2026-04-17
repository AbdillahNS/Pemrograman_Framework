import Link from "next/link";
import style from "../../auth/register/register.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";

const TampilanRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();
    const [error, setError] = useState("");
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>,) => {
        setError("");
        setIsLoading(true);
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(event.currentTarget);
        const email = ((formData.get("email") as string) || "").trim();
        const fullname = ((formData.get("Fullname") as string) || "").trim();
        const password = (formData.get("Password") as string) || "";

        if (!email) {
            setIsLoading(false);
            setError("Email wajib diisi");
            return;
        }

        if (password.length < 6) {
            setIsLoading(false);
            setError("Password minimal 6 karakter");
            return;
        }

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, fullname, password }),
        });
        const result = await response.json();
        if (response.status === 200) {
            form.reset();
            setIsLoading(false);
            push("/auth/login");
        } else {
            setIsLoading(false);
            setError(result.name || "An error occurred");
        }
    };
    
    return (
        <div className={style.register}>
                {error && <p className={style.register__error}>{error}</p>}
            <h1 className={style.register__title}>Halaman Register</h1>
            <div className={style.register__form}>
                <form onSubmit={handleSubmit}>
                    <div className={style.register__form__item}>
                        <label
                            htmlFor="email"
                            className={style.register__form__item__label}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                            className={style.register__form__item__input}
                        />
                    </div>
                    <div className={style.register__form__item}>
                        <label
                            htmlFor="Fullname"
                            className={style.register__form__item__label}
                        >
                            Fullname
                        </label>
                        <input
                            type="text"
                            id="Fullname"
                            name="Fullname"
                            placeholder="Fullname"
                            className={style.register__form__item__input}
                        />
                    </div>
                    <div className={style.register__form__item}>
                        <label
                            htmlFor="Password"
                            className={style.register__form__item__label}
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
                            className={style.register__form__item__input}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className={style.register__form__item__button}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>
                <br />
                <p className={style.register__form__item__text}>
                    Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
                </p>
            </div>
        </div>
    );
};

export default TampilanRegister;