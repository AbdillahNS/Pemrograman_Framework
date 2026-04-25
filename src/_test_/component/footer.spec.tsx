import { render, screen } from "@testing-library/react";
import Footer from "@/components/layouts/footer";

describe("Footer component", () => {
    it("renders footer text", () => {
        render(<Footer />);

        expect(screen.getByText("Footer Component").textContent).toBe("Footer Component");
    });
});