import { render, screen } from "@testing-library/react";
import Home from "@/pages";

describe("Home Page", () => {
    it("renders home page title", () => {
        render(<Home />);

        expect(screen.getByText("Praktikum Next.js Pages Router").textContent).toBe("Praktikum Next.js Pages Router");
    });
});