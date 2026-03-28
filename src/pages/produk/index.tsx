import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import TampilanProduk from "../views/product";
import useSWR from "swr";
import fetcher from "../utils/swr/fetcher";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());
const kategori = () => {
    const [products, setProducts] = useState([]);
    const { data, error, isLoading } = useSWR("/api/produk", fetcher);

    return (
        <div>
            <TampilanProduk products={isLoading ? [] : data.data} />
        </div>
    );
};

export default kategori;