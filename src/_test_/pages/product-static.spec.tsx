import { render, screen } from "@testing-library/react";
import HalamanProdukStatic, { getStaticProps } from "@/pages/produk/static";

jest.mock("../../views/product", () => ({
    __esModule: true,
    default: ({ products }: any) => <div data-testid="product-view-mock">{products.length}</div>,
}));

describe("Product static page", () => {
    it("returns static props and renders the page", async () => {
        const products = [
            {
                id: "1",
                name: "Jaket",
                price: 350000,
                image: "/jaket.jpg",
                category: "Fashion",
            },
        ];

        global.fetch = jest.fn().mockResolvedValue({
            json: async () => ({ data: products }),
        }) as jest.Mock;

        const result = await getStaticProps();
        expect(result.props.products).toEqual(products);

        render(<HalamanProdukStatic products={products} />);

        expect(screen.getByText("Halaman Produk Static").textContent).toBe("Halaman Produk Static");
        expect(screen.getByTestId("product-view-mock").textContent).toBe("1");
    });
});