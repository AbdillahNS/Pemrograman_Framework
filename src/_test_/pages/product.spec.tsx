import { render } from "@testing-library/react";
import TampilanProduk from "@/pages/produk";
import useSWR from "swr";

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/produk",
            pathname: "/produk",
            query: {},
            asPath: "/produk",
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
            },
            isReady: true,
        }
    }
}));

jest.mock("swr", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("Product Page", () => {
    beforeEach(() => {
        (useSWR as jest.Mock).mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: true,
        });
    });

    it("renders product page correctly", () => {
        const page = render(<TampilanProduk />);
        expect(page).toMatchSnapshot();
    });
});