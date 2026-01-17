import { useState, useEffect } from 'react';

export const useCodeExecutor = (code, language, pyodideInstance) => {
    const [output, setOutput] = useState([]);
    const [error, setError] = useState('');

    const executePython = async () => {
        if (!pyodideInstance) {
            setOutput([{
                type: 'info',
                value: '⏳ Loading Python runtime... Please wait.'
            }]);
            return;
        }

        try {
            pyodideInstance.runPython(`
                import sys
                from io import StringIO
                sys.stdout = StringIO()
                sys.stderr = StringIO()
      `);

            pyodideInstance.runPython(code);

            const stdout = pyodideInstance.runPython('sys.stdout.getvalue()');
            const stderr = pyodideInstance.runPython('sys.stderr.getvalue()');

            const logs = [];

            if (stdout) {
                logs.push({
                    type: 'log',
                    value: stdout
                });
            }

            if (stderr) {
                setError(stderr);
            } else {
                setOutput(logs.length > 0 ? logs : [{
                    type: 'log',
                    value: 'Code executed successfully (no output)'
                }]);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const executeJavaScript = () => {
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

    const executeCode = async () => {
        setOutput([]);
        setError('');

        if (language === 'javascript') {
            executeJavaScript();
        } else if (language === 'python') {
            await executePython();
        } else if (language === 'java') {
            setOutput([{
                type: 'info',
                value: '⚠️ Java execution is not supported in the browser.\n\nJava requires a JVM which cannot run in the browser.\nYou can still write and edit Java code with syntax highlighting!'
            }]);
        }
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            executeCode();
        }, 1000);

        return () => clearTimeout(debounceTimer);
    }, [code, language, pyodideInstance]);

    const clearOutput = () => {
        setOutput([]);
        setError('');
    };

    return {
        output,
        error,
        executeCode,
        clearOutput
    };
};
