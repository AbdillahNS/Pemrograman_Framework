import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

type ProductType = {
    id: string;
    name: string;
    price: number;
    size: string;
    category: string;
}

const kategori = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        fetch('/api/produk')
            .then((response) => response.json())
            .then((responsedata) => {
                setProducts(responsedata.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Daftar Produk</h1>
            <button onClick={fetchProducts}>Refresh Produk</button>
            {products.map((products: ProductType) => (
                <div key={products.id}>
                    <h2>{products.name}</h2>
                    <p>Harga: {products.price}</p>
                    <p>Ukuran: {products.size}</p>
                    <p>Kategori: {products.category}</p>
                </div>
            ))}
        </div>
    );
};

export default kategori;