import { useEffect } from 'react';
import { X, Camera, CameraOff } from 'lucide-react';

const CameraPreview = ({ isVisible, onClose, stream, error, onToggleCamera }) => {
  useEffect(() => {
    // Auto-play video when stream is available
    const videoElement = document.getElementById('camera-video');
    if (videoElement && stream) {
      videoElement.srcObject = stream;
      videoElement.play().catch(console.error);
    }
  }, [stream]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className="relative bg-[#1e1e1e] rounded-lg shadow-2xl"
        style={{ width: "200px" }}
      >
        {/* Header */}
        <div className="flex  items-center justify-between p-4 border-b border-[#2d2d2d]">
          <h3 className="text-white text-lg font-semibold flex items-center gap-2">
            <Camera size={20} />
            Live Recording
          </h3>
          {/* <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button> */}
        </div>

        {/* Camera Content */}
        <div className="p-4">
          {error ? (
            <div className="text-center py-8">
              <CameraOff size={48} className="text-red-500 mx-auto mb-4" />
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={onToggleCamera}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : stream ? (
            <div className="relative">
              <video
                id="camera-video"
                autoPlay
                playsInline
                muted
                className="w-full h-auto rounded-lg bg-black"
                style={{ maxHeight: "70vh" }}
              />
              <div className="absolute bottom-4 left-4">
                <div className="bg-red-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Camera size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Camera is not active</p>
              <button
                onClick={onToggleCamera}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto"
              >
                <Camera size={16} />
                Start Camera
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraPreview;
