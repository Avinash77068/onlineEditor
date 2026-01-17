import { Play, Save, Share2, Settings, Pen, Pencil, Camera } from 'lucide-react';

const Sidebar = ({ onRun, onClear, onShare, onColoumChange, onCameraToggle, cameraActive }) => {
  return (
    <aside className="bg-[#252526] border-r border-[#2d2d2d] w-14 flex flex-col items-center py-4 gap-4">
      <button
        onClick={onRun}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1e1e1e] hover:bg-[#2d2d2d] text-gray-400 hover:text-white transition-colors"
        title="Run Code"
      >
        <Play size={20} />
      </button>

      <button
        onClick={onClear}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1e1e1e] hover:bg-[#2d2d2d] text-gray-400 hover:text-white transition-colors"
        title="Clear"
      >
        <Save size={20} />
      </button>

      <button
        onClick={onShare}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1e1e1e] hover:bg-[#2d2d2d] text-gray-400 hover:text-white transition-colors"
        title="Share"
      >
        <Share2 size={20} />
      </button>

      <button
        onClick={onCameraToggle}
        className={`w-10 h-10 flex items-center justify-center rounded-lg bg-[#1e1e1e] hover:bg-[#2d2d2d] text-gray-400 hover:text-white transition-colors ${
          cameraActive ? 'text-green-400' : ''
        }`}
        title="Camera"
      >
        <Camera size={20} />
      </button>

      <button
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1e1e1e] hover:bg-[#2d2d2d] text-gray-400 hover:text-white transition-colors"
        title="Settings"
        onClick={onColoumChange}
      >
        <Pencil size={20} />
      </button>

      <div className="flex-1"></div>

      <button
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1e1e1e] hover:bg-[#2d2d2d] text-gray-400 hover:text-white transition-colors"
        title="Settings"
      >
        <Settings size={20} />
      </button>
    </aside>
  );
};

export default Sidebar;
