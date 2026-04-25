import { render, screen } from "@testing-library/react";
import RegisterPage from "@/pages/auth/register";

jest.mock("../../views/auth/register", () => ({
    __esModule: true,
    default: () => <div>Register View Mock</div>,
}));

describe("Register Page", () => {
    it("renders the register view wrapper", () => {
        render(<RegisterPage />);

        expect(screen.getByText("Register View Mock").textContent).toBe("Register View Mock");
    });
});