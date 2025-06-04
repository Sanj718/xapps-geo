import { lazy, useEffect, useState } from 'react';

const Editor = lazy(() => import('@monaco-editor/react'));

interface CodeEditorProps {
    code: string;
    onChange: ((value: string) => void);
    language?: "css" | "javascript";
    simple?: boolean;
}

export default function CodeEditor({ code, onChange = () => { }, language = "css", simple = false }: CodeEditorProps) {

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

    return (
        <div className="code-editor-container" style={{ border: "1px solid #ccc", borderRadius: "4px" }}>
            <Editor
                height="300px"
                width="100%"
                language={language}
                defaultValue={code}
                value={code}
                onChange={(value) => value && onChange(value)}
                options={options as any}
            />
        </div>
    );
}