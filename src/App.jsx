import Main from './Editor/Main'
import CameraPreview from './Editor/components/CameraPreview'
import { useCamera } from './Editor/hooks/useCamera'
import { useState } from 'react'

export default function App() {
  const { stream, isActive: cameraActive, error: cameraError, toggleCamera } = useCamera();
  const [showCamera, setShowCamera] = useState(false);

  const handleCameraToggle = () => {
    setShowCamera(!showCamera);
    if (!showCamera && !cameraActive) {
      setTimeout(() => toggleCamera(), 100);
    }
  };

  return (
    <>
      <Main
        cameraActive={cameraActive}
        showCamera={showCamera}
        handleCameraToggle={handleCameraToggle}
      />
      <CameraPreview
        isVisible={showCamera}
        onClose={() => setShowCamera(false)}
        stream={stream}
        error={cameraError}
        onToggleCamera={toggleCamera}
      />
    </>
  );
}
