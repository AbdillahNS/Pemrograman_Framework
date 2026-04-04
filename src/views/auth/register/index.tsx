import Link from "next/link";
import styles from "./register.module.css";

const TampilanRegister = () => {
    return (
        <div className={styles.register}>
            <h1>Halaman Register</h1>

            <form className={styles.form}>
                <input type="text" placeholder="Nama" className={styles.input} />
                <input type="email" placeholder="Email" className={styles.input} />
                <input type="password" placeholder="Password" className={styles.input} />
                <button type="submit" className={styles.button}>Daftar</button>
            </form>

            <p className={styles.text}>Sudah punya akun?</p>
            <Link href="/auth/login" className={styles.link}>Ke Halaman Login</Link>
        </div>
    );
};

export default TampilanRegister;
