import { render, screen } from "@testing-library/react";
import HalamanProduk, { getStaticPaths, getStaticProps } from "@/pages/produk/[produk]";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

describe("Product detail page", () => {
    it("renders product detail and loads static props", async () => {
        const product = {
            id: "1",
            name: "Sepatu",
            price: 250000,
            image: "/sepatu.jpg",
            category: "Fashion",
        };

        global.fetch = jest.fn().mockResolvedValue({
            json: async () => ({ data: [product] }),
        }) as jest.Mock;

        const pathsResult = await getStaticPaths();
        expect(pathsResult.fallback).toBe(false);
        expect(pathsResult.paths[0].params.produk).toBe("1");

        const propsResult = await getStaticProps({ params: { produk: "1" } });
        expect(propsResult.props.product).toEqual([product]);

        render(<HalamanProduk product={product} />);

        expect(screen.getByText("Detail Produk").textContent).toBe("Detail Produk");
        expect(screen.getByText("Sepatu").textContent).toBe("Sepatu");
    });
});