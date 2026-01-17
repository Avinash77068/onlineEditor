import { Maximize2 } from 'lucide-react';

const OutputPanel = ({ output, error }) => {
  return (
    <div className="flex-1 flex flex-col  bg-[#1e1e1e] border-l border-[#2d2d2d]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#2d2d2d]">
        <span className="text-gray-400 text-sm font-medium" style={{marginLeft: '16px'}}>Output</span>
        <button className="text-gray-400 hover:text-white transition-colors" style={{marginRight: '16px'}}>
          <Maximize2 size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-auto" style={{paddingLeft: '16px', paddingRight: '16px'}}>
        {error ? (
          <div className="text-red-400 font-mono text-sm whitespace-pre-wrap">
            {error}
          </div>
        ) : output.length > 0 ? (
          <div className="space-y-2" style={{paddingTop: '16px', paddingBottom: '16px'}}>
            {output.map((item, index) => (
              <div key={index} className="font-mono text-sm">
                {item.type === "log" && (
                  <div className="text-gray-300">{item.value}</div>
                )}
                {item.type === "result" && (
                  <div className="text-green-400">{item.value}</div>
                )}
                {item.type === "error" && (
                  <div className="text-red-400">{item.value}</div>
                )}
                {item.type === "info" && (
                  <div className="text-yellow-400 whitespace-pre-wrap">{item.value}</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-sm" style={{paddingTop: '16px', paddingBottom: '16px'}}>
            Run your code to see the output here...
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
