import { render, screen } from "@testing-library/react";
import AppShell from "@/components/layouts/Appshell";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

jest.mock("next/dist/client/script", () => ({
    __esModule: true,
    default: ({ children }: any) => <>{children}</>,
}));

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
    __esModule: true,
    useSession: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
}));

describe("AppShell component", () => {
    it("renders navbar and footer on regular pages", () => {
        (useRouter as jest.Mock).mockReturnValue({ pathname: "/about" });
        (useSession as jest.Mock).mockReturnValue({ data: null });

        render(
            <AppShell>
                <div>Content</div>
            </AppShell>
        );

        expect(screen.getByText("Footer Component").textContent).toBe("Footer Component");
        expect(screen.getByText("Sign In").textContent).toBe("Sign In");
    });
});