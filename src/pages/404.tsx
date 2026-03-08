import Link from "next/link";
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
    return (
        <div className={styles.error}>
        <head>
            <title>404 - Halaman Tidak Ditemukan</title>
        </head>
            <img src="/page-not-found.png" alt="404" className={styles.error__image} />
            <h1  className="text-4xl font-bold mb-4">404 - Halaman Tidak Ditemukan</h1>
            <p className="text-lg text-gray-600">Maaf, halaman yang Anda cari tidak ada.</p>
            <Link href="/" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Kembali ke Home
            </Link>
        </div>
    );
};

export default Custom404;