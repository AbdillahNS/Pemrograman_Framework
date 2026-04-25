import Document from "@/pages/_document";

describe("Document", () => {
    it("renders html lang id", () => {
        const element = Document();

        expect(element.props.lang).toBe("id");
    });
});