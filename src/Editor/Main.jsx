import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/CodeEditor";
import OutputPanel from "./components/OutputPanel";
import LanguageSelector from "./components/LanguageSelector";
import { useLanguageSelector } from "./hooks/useLanguageSelector";
import { useCodeExecutor } from "./hooks/useCodeExecutor";
import { usePyodide } from "./hooks/usePyodide";
import { useState } from "react";
import question from "./components/questiondata/question";

function Main({ cameraActive,  handleCameraToggle }) {
  const { language, code, changeLanguage, updateCode, getLanguages, setCode } =
    useLanguageSelector();
  const { pyodide, loading: pyodideLoading } = usePyodide();
  const { output, error, executeCode, clearOutput } = useCodeExecutor(
    code,
    language,
    pyodide,
  );
  const [questions, setQuestion] = useState(
    question[Math.floor(Math.random() * question.length)],
  );
  const [changecolor, setChangeColor] = useState("blueDark");
  const [changeColoum, setChangeColoum] = useState("lg:flex-row");
  const handleClear = () => {
    updateCode("");
    clearOutput();
  };
  const handleColoumChange = () => {
    if (changeColoum === "lg:flex-col") {
      setChangeColoum("lg:flex-row");
    } else {
      setChangeColoum("lg:flex-col");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const handleSave = () => {
    try {
      localStorage.setItem('editorCode', code);
      localStorage.setItem('editorLanguage', language);
      alert("Code saved to localStorage!");
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      alert("Failed to save code!");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e]">
      <Header />
      <div className="flex items-center justify-between px-6 py-3 bg-[#252526] border-b border-[#2d2d2d] relative">
        {/* Left: Language Selector */}
        <div className="flex">
          <LanguageSelector
            language={language}
            onLanguageChange={changeLanguage}
            languages={getLanguages()}
          />
        </div>

        {/* Center: Language Text (SCREEN CENTER) */}
        <div className="absolute left-1/2 -translate-x-1/2 text-white font-semibold pointer-events-none">
          {questions.question}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          onRun={executeCode}
          onClear={handleClear}
          onShare={handleShare}
          onColoumChange={handleColoumChange}
          onCameraToggle={handleCameraToggle}
          cameraActive={cameraActive}
          onSave={handleSave}
        />

        <div className={`flex-1 flex flex-col ${changeColoum} overflow-hidden`}>
          <CodeEditor
            code={code}
            onChange={setCode}
            language={language}
            onRun={executeCode}
            onChangeColor={setChangeColor}
            changeColor={changecolor}
          />
          <OutputPanel output={output} error={error} />
        </div>
      </div>
    </div>
  );
}

export default Main;
