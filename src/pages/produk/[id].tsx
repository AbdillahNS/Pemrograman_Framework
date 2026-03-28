import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from '../utils/swr/fetcher';
import TampilanProduk from '../views/product';

const HalamanProduk = () => {
    const { query } = useRouter();
    const { data, error, isLoading } = useSWR('/api/produk', fetcher);

    return (
        <div>
            <div>
                <h1>Halaman Produk Detail</h1>
                <p>Produk ID: {query.id}</p>
            </div>
            <div>
                <TampilanProduk products={isLoading ? [] : data?.data || []} />
            </div>
        </div>
    );
};

export default HalamanProduk;