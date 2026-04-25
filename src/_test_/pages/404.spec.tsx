import { render, screen } from "@testing-library/react";
import Custom404 from "@/pages/404";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

describe("404 Page", () => {
    it("renders the 404 message", () => {
        render(<Custom404 />);

        expect(screen.getByText("404 - Halaman Tidak Ditemukan").textContent).toBe("404 - Halaman Tidak Ditemukan");
    });
});