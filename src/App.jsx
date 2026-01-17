import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import LanguageSelector from './components/LanguageSelector';
import { useLanguageSelector } from './hooks/useLanguageSelector';
import { useCodeExecutor } from './hooks/useCodeExecutor';
import { usePyodide } from './hooks/usePyodide';

function App() {
  const { language, code, changeLanguage, updateCode, getLanguages, setCode } = useLanguageSelector();
  const { pyodide, loading: pyodideLoading } = usePyodide();
  const { output, error, executeCode, clearOutput } = useCodeExecutor(code, language, pyodide);

  const handleClear = () => {
    updateCode('');
    clearOutput();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e]">
      <Header />
      <div className="flex items-center justify-between px-6 py-3 bg-[#252526] border-b border-[#2d2d2d]">
        <div className="flex items-center gap-4">
          <LanguageSelector
            language={language}
            onLanguageChange={changeLanguage}
            languages={getLanguages()}
          />
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          onRun={executeCode}
          onClear={handleClear}
          onShare={handleShare}
        />
        
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <CodeEditor 
            code={code}
            onChange={setCode}
            language={language}
            onRun={executeCode}
          />
          <OutputPanel 
            output={output}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
