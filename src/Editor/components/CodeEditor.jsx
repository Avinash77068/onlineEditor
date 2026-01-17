import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { Maximize2 } from "lucide-react";

export default function CodeEditor({ code, onChange , language, onChangeColor, changeColor}) {
  const editorRef = useRef(null);


  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
    monaco.editor.defineTheme("blueDark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "4FC3F7" }, 
        { token: "string", foreground: "81C784" },
        { token: "number", foreground: "FFD54F" }, 
        { token: "comment", foreground: "607D8B" }, 
        { token: "identifier", foreground: "90CAF9" }, 
        { token: "delimiter", foreground: "64B5F6" }, 
        { token: "type", foreground: "BA68C8" }, 
      ],
      colors: {
        "editor.background": "#0B1C2D",
        "editor.lineHighlightBackground": "#102A44",
        "editorCursor.foreground": "#4FC3F7",
        "editorLineNumber.foreground": "#547A9E",
        "editor.selectionBackground": "#1E3A5F",
        "editor.inactiveSelectionBackground": "#153A5B",
      },
    });

    monaco.editor.setTheme(changeColor);

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => { alert("Paste disabled"); });
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Insert, () => { alert("Insert disabled"); });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC, () => { alert("Copy disabled"); });

    editor.updateOptions({
      contextmenu: false,
    });
  };

  return (
    <div className="flex-1 flex flex-col border border-[#1E3A5F]  overflow-hidden" style={{backgroundColor: '#0B1C2D'}}>
      <div className="flex items-center justify-between px-4 py-2 bg-[#102A44] border-b border-[#1E3A5F]">
        <div className="text-sm text-blue-300 font-medium" style={{marginLeft: '16px'}}>
          {language}
        </div>
        <button className="text-blue-400 hover:text-blue-300 transition" style={{marginRight: '16px'}}>
          <Maximize2 size={16} />
        </button>
      </div>

      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          fontFamily: "Fira Code, monospace",
          minimap: { enabled: false },
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          lineNumbers: "on",
          renderLineHighlight: "all",
          cursorBlinking: "smooth",
          cursorStyle: "line",
          padding: { top: 16, bottom: 16 },
          bracketPairColorization: { enabled: true },
          colorDecorators: true,
          readOnly: false,
        }}
      />
    </div>
  );
}
