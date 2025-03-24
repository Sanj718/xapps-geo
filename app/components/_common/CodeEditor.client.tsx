import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';

interface CodeEditorProps {
    code: string;
    onChange: ((value: string) => void) | undefined;
}

export default function CodeEditor({ code, onChange }: CodeEditorProps) {
    return <CodeMirror
        value={code || ""}
        height="200px"
        extensions={[langs.css()]}
        basicSetup={{
            autocompletion: true,
        }}
        onChange={onChange}
    />
}