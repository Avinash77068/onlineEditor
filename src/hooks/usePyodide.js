import { useState, useEffect } from 'react';

export const usePyodide = () => {
  const [pyodide, setPyodide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const pyodideModule = await import('pyodide');
        const pyodideInstance = await pyodideModule.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.1/full/'
        });
        setPyodide(pyodideInstance);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load Pyodide:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadPyodide();
  }, []);

  const runPython = async (code) => {
    if (!pyodide) {
      throw new Error('Pyodide is not loaded yet');
    }

    try {
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
      `);

      pyodide.runPython(code);

      const stdout = pyodide.runPython('sys.stdout.getvalue()');
      const stderr = pyodide.runPython('sys.stderr.getvalue()');

      return {
        output: stdout,
        error: stderr
      };
    } catch (err) {
      return {
        output: '',
        error: err.message
      };
    }
  };

  return {
    pyodide,
    loading,
    error,
    runPython
  };
};
