// import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import Editor from '@monaco-editor/react';
// import { langs } from '@ui, useStatew/codemirror-extensions-langs';
import { useEffect, useState } from 'react';
interface CodeEditorProps {
    code: string;
    onChange: ((value: string) => void);
    language?: "css" | "javascript";
    simple?: boolean;
}

export default function CodeEditor({ code, onChange = () => { }, language = "css", simple = false }: CodeEditorProps) {
    // const [render, setRender] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setRender(true);
    //     }, 5000);
    // }, []);

    const options = simple ? {
        readOnly: false,
        minimap: { enabled: false },
        scrollbar: {
            vertical: "hidden",
        },
        overviewRulerBorder: false,
        renderLineHighlight: "none",
        glyphMargin: false,
        lineNumbers: "off",
        folding: false,
    } : {
        readOnly: false,
        minimap: { enabled: false },
    }
    return <Editor
        height="300px"
        width="100%"
        language={language}
        defaultValue={code}
        value={code}
        onChange={onChange}
        options={options}
    />
}