import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/swr/fetcher";
import DetailProduk from "../../views/DetailProduct";
import { ProductType } from "@/types/Product.type";

const HalamanProduk = ({ product }: { product: ProductType }) => {
    {/digunakan client-side rendering/}
    // const { query } = useRouter();
    // const { data, error, isLoading } = useSWR('/api/produk', fetcher);

    // const { query } = useRouter();
    // const { data, error, isLoading } = useSWR(`/api/produk/${query.produk}`, fetcher);

    // return (
    //     <div>
    //         <DetailProduk product={isLoading ? [] : data.data} />
    //     </div>
    // );
    return (
        <div>
            <DetailProduk product={product} />
        </div>
    )
};

export default HalamanProduk;

// fungsi get ServerSideProps akan dipanggil setiap kali halaman ini diakses, 
// dan akan mengambil data produk dari API sebelum merender halaman.
{/digunakan client-side rendering/}
// export async function getServerSideProps({ params }: { params: { produk: string } }) {
//     const res = await fetch(`http://localhost:3000/api/produk/${params?.produk}`);
//     const respone = await res.json();
//     // console.log("Data produk yang diambil dari API:", respone.data);
//     return {
//         props: {
//             product: respone.data, // nilai default untuk product jika data tidak tersedia atau terjadi error
//         },
//     };
// }
{/digunakan static-site generation/}
export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3000/api/product`);
    const respone = await res.json();

    const paths = respone.data.map((product: ProductType) => ({
        params: { produk: product.id},
    }));

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }: { params: { produk: string } }) {
    const res = await fetch(`http://localhost:3000/api/produk/${params?.produk}`);
    const respone: { data: ProductType[] } = await res.json();
    return {
        props: {
            product: respone.data, // nilai default untuk product jika data tidak tersedia atau terjadi error
        },
    };
}