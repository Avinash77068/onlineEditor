import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/CodeEditor";
import OutputPanel from "./components/OutputPanel";
import LanguageSelector from "./components/LanguageSelector";
import CameraPreview from "./components/CameraPreview";
import { useLanguageSelector } from "./hooks/useLanguageSelector";
import { useCodeExecutor } from "./hooks/useCodeExecutor";
import { usePyodide } from "./hooks/usePyodide";
import { useCamera } from "./hooks/useCamera";
import { useState } from "react";
import question from "./components/questiondata/question";
function Main() {
  const { language, code, changeLanguage, updateCode, getLanguages, setCode } =
    useLanguageSelector();
  const { pyodide, loading: pyodideLoading } = usePyodide();
  const { output, error, executeCode, clearOutput } = useCodeExecutor(
    code,
    language,
    pyodide,
  );
  const { stream, isActive: cameraActive, error: cameraError, toggleCamera } = useCamera();
  const [questions, setQuestion] = useState(
    question[Math.floor(Math.random() * question.length)],
  );
  const [changecolor, setChangeColor] = useState("blueDark");
  const [changeColoum, setChangeColoum] = useState("lg:flex-row");
  const [showCamera, setShowCamera] = useState(false);
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

  const handleCameraToggle = () => {
    console.log('Camera button clicked!', { showCamera, cameraActive });
    setShowCamera(!showCamera);
    if (!showCamera && !cameraActive) {
      // Auto-start camera when opening modal
      console.log('Starting camera...');
      setTimeout(() => toggleCamera(), 100);
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

      {/* Camera Preview Modal */}
      <CameraPreview
        isVisible={showCamera}
        onClose={() => setShowCamera(false)}
        stream={stream}
        error={cameraError}
        onToggleCamera={toggleCamera}
      />
    </div>
  );
}

export default Main;
