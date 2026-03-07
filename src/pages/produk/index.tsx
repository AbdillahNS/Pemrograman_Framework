import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilanProduk from "../views/produk";

const HalamanProduk = () => {
    const [isLogin] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        if (isLogin) {
            push("/auth/login");
        }
    }, [isLogin, push]);

    return (
        <>
            <TampilanProduk />
        </>
    );
};

export default HalamanProduk;