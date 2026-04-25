import TampilanProduk from "../../views/product";
import { ProductType } from "../../types/Product.type";

const halamanProdukStatic = (props:{products:ProductType[]}) => {
    const { products } = props;
    return (
        <div>
            <h1>Halaman Produk Static</h1>
            <TampilanProduk products={products}/>
        </div>
    );
};

export default halamanProdukStatic;

export async function getStaticProps() {
    const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/produk");
    const response: { data: ProductType[] } = await res.json();
    return {
        props: {
            products: response.data,
        },
        revalidate: 10, // revalidate data setiap 10 detik
    }
}