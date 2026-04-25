import { render, screen } from "@testing-library/react";
import App from "@/pages/_app";

jest.mock("next/router", () => ({
    useRouter: jest.fn(() => ({ pathname: "/about" })),
}));

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
    SessionProvider: ({ children }: any) => <>{children}</>,
    useSession: jest.fn(() => ({ data: null })),
    signIn: jest.fn(),
    signOut: jest.fn(),
}));

jest.mock("../../components/layouts/Appshell", () => ({
    __esModule: true,
    default: ({ children }: any) => <div data-testid="app-shell-mock">{children}</div>,
}));

describe("App wrapper", () => {
    it("wraps the page component", () => {
        const DummyPage = () => <div>Dummy Page</div>;

        render(<App Component={DummyPage} pageProps={{ session: null }} /> as any);

        expect(screen.getByTestId("app-shell-mock").textContent).toBe("Dummy Page");
    });
});