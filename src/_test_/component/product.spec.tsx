import { render, screen } from "@testing-library/react";
import ProductView from "@/views/product";

jest.mock("next/link", () => ({
    __esModule: true,
    default: ({ children, href, ...props }: any) => (
        <a href={href} {...props}>
            {children}
        </a>
    ),
}));

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

describe("Product component", () => {
    it("shows the product title and item data", () => {
        render(
            <ProductView
                products={[
                    {
                        id: "1",
                        name: "Kemeja Hitam",
                        price: 150000,
                        image: "/kemeja.jpg",
                        category: "Fashion",
                    },
                ]}
            />
        );

        expect(screen.getByTestId("product-title").textContent).toBe("Daftar Produk");
        expect(screen.getByText("Kemeja Hitam").textContent).toBe("Kemeja Hitam");
    });
});