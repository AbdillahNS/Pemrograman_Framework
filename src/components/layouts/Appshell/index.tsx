import { useRouter } from "next/router";
import Navbar from "../navbar";
import Footer from "../footer";

const disableNavbar = ['/auth/login', '/auth/register']; // Daftar path yang ingin disembunyikan Navbar
type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();

    return (
        <main>
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
            <Footer />
        </main>
    );
};

export default AppShell;