import { Suspense, lazy } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// const ReactQuill = lazy(() => import("react-quill"));

interface TextEditorProps { textValue: string, textOnChange: ((value: string) => void) | undefined, disabled: boolean }

export default function TextEditor({ textValue = "", textOnChange, disabled = false }: TextEditorProps) {
    const toolbarOptions = [
        // [{ header: [2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["link"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
    ];
    return <div className={disabled ? "visually-disabled" : ""}>

        <ReactQuill className="text-editor"
            theme="snow"
            style={{ background: "#fff" }}
            value={textValue || ""}
            onChange={textOnChange}
            modules={{ toolbar: toolbarOptions }} />

    </div>
}