import { render, screen } from "@testing-library/react";
import SettingPage from "@/pages/setting/app";

describe("Setting Page", () => {
    it("renders setting page text", () => {
        render(<SettingPage />);

        expect(screen.getByText("App Setting Page").textContent).toBe("App Setting Page");
    });
});