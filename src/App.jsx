import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';

function App() {
  const [code, setCode] = useState(`console.log('avinash shrivastav')`);
  const [output, setOutput] = useState([]);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('javascript');

  const executeCode = () => {
    setOutput([]);
    setError('');

    const logs = [];
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
    };

    console.log = (...args) => {
      logs.push({
        type: 'log',
        value: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')
      });
      originalConsole.log(...args);
    };

    console.error = (...args) => {
      logs.push({
        type: 'error',
        value: args.map(arg => String(arg)).join(' ')
      });
      originalConsole.error(...args);
    };

    try {
      const result = eval(code);
      if (result !== undefined) {
        logs.push({
          type: 'result',
          value: typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)
        });
      }
      setOutput(logs);
    } catch (err) {
      setError(err.toString());
    } finally {
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
    }
  };

  const handleClear = () => {
    setCode('');
    setOutput([]);
    setError('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      executeCode();
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [code]);

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e]">
      <Header />
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
