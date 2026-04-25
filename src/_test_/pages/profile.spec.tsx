import { render, screen } from "@testing-library/react";
import ProfilePage from "@/pages/profile";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
    __esModule: true,
    useSession: jest.fn(),
}));

describe("Profile Page", () => {
    it("renders the user name from session", () => {
        (useSession as jest.Mock).mockReturnValue({
            data: { user: { fullname: "Budi" } },
        });

        render(<ProfilePage />);

        expect(screen.getByText(/Selamat datang, Budi/).textContent).toBe("Selamat datang, Budi");
    });
});