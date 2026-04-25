import { render, screen } from "@testing-library/react";
import UserPasswordPage from "@/pages/user/password";

describe("User Password Page", () => {
    it("renders password page text", () => {
        render(<UserPasswordPage />);

        expect(screen.getByText("User Setting Page").textContent).toBe("User Setting Page");
    });
});