import { render, screen } from "@testing-library/react";
import AdminPage from "@/pages/admin";

describe("Admin Page", () => {
    it("renders admin page text", () => {
        render(<AdminPage />);

        expect(screen.getByText("Halaman Admin").textContent).toBe("Halaman Admin");
    });
});