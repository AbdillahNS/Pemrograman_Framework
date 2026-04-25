import { render, screen } from "@testing-library/react";
import LoginPage from "@/pages/auth/login";

jest.mock("../../views/auth/login", () => ({
    __esModule: true,
    default: () => <div>Login View Mock</div>,
}));

describe("Login Page", () => {
    it("renders the login view wrapper", () => {
        render(<LoginPage />);

        expect(screen.getByText("Login View Mock").textContent).toBe("Login View Mock");
    });
});