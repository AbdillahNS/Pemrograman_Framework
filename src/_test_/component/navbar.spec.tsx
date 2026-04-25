import { render, screen } from "@testing-library/react";
import Navbar from "@/components/layouts/navbar";
import { useSession, signIn, signOut } from "next-auth/react";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

jest.mock("next/dist/client/script", () => ({
    __esModule: true,
    default: ({ children }: any) => <>{children}</>,
}));

jest.mock("next-auth/react", () => ({
    __esModule: true,
    useSession: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
}));

describe("Navbar component", () => {
    it("renders sign in button when there is no session", () => {
        (useSession as jest.Mock).mockReturnValue({ data: null });

        render(<Navbar />);

        expect(screen.getByText("Sign In").textContent).toBe("Sign In");
    });

    it("renders user info and sign out button when session exists", () => {
        (useSession as jest.Mock).mockReturnValue({
            data: {
                user: {
                    fullname: "Budi",
                    image: "/avatar.png",
                },
            },
        });

        render(<Navbar />);

        expect(screen.getByText(/Welcome, Budi/).textContent).toBe("Welcome, Budi");
        expect(screen.getByText("Sign Out").textContent).toBe("Sign Out");
    });
});