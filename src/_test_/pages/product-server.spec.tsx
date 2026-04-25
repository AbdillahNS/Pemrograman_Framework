import { render, screen } from "@testing-library/react";
import HalamanProdukServer, { getServerSideProps } from "@/pages/produk/server";

jest.mock("../../views/product", () => ({
    __esModule: true,
    default: ({ products }: any) => <div data-testid="product-view-mock">{products.length}</div>,
}));

describe("Product server page", () => {
    it("returns server props and renders the page", async () => {
        const products = [
            {
                id: "1",
                name: "Kaos",
                price: 100000,
                image: "/kaos.jpg",
                category: "Fashion",
            },
        ];

        global.fetch = jest.fn().mockResolvedValue({
            json: async () => ({ data: products }),
        }) as jest.Mock;

        const result = await getServerSideProps();
        expect(result.props.products).toEqual(products);

        render(<HalamanProdukServer products={products} />);

        expect(screen.getByText("Halaman Produk Server").textContent).toBe("Halaman Produk Server");
        expect(screen.getByTestId("product-view-mock").textContent).toBe("1");
    });
});