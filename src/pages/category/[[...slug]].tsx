import { useRouter } from "next/router";

const halamanKategori = () => {
    const { query } = useRouter();
    const { slug } = query;

    return (
        <div>
            <h1>Halaman Kategori</h1>
            <ul style={{ marginLeft: '20px' }}> 
                {Array.isArray(slug) ? (
                    slug.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                ) : (
                    <li>Semua Kategori</li>
                )}
            </ul>
        </div>
    );
};

export default halamanKategori;