import Image from "next/image";
import { ProductType } from "../../types/Product.type";
import styles from "../DetailProduct/detailProduct.module.scss";

const DetailProduk = ({ product }: { product: ProductType }) => {
    return (
        <>
            <h1 className={styles.title}>Detail Produk</h1>
            <div className={styles.produkdetail}>
                <div className={styles.produkdetail__image}>
                    <Image src={product.image && product.image} alt={product.name} width={400} height={400} />
                </div>

                <div className={styles.produkdetail__info}>
                    <h1 className={styles.produkdetail__name}>{product.name}</h1>
                    <p className={styles.produkdetail__category}>{product.category}</p>
                    <p className={styles.produkdetail__price}>
                        Rp {product.price && product.price.toLocaleString("id-ID")}
                    </p>
                </div>
            </div>
        </>
    );
};

export default DetailProduk;