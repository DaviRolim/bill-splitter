import React, { useState, useRef } from 'react';
import { FcCompactCamera } from 'react-icons/fc';
import { FiCamera } from 'react-icons/fi';

type CameraProps = {
  onAnalyzeExpense: (imageData: string | null) => void;
};

const CameraComponent = ({ onAnalyzeExpense }: CameraProps) => {
  const [imageData, setImageData] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const startCamera = () => {
    setShowCamera(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(error => {
        console.log(`Error accessing camera: ${error}`);
      });
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      videoRef.current!.srcObject = null;
    }
  };

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.videoWidth || 0;
      canvas.height = video.videoHeight || 0;
      canvas.getContext('2d')?.drawImage(video, 0, 0);

      const dataUrl = canvas.toDataURL('image/png');
      stopCamera();
      setShowCamera(false);

      setImageData(dataUrl);
      // onAnalyzeExpense(dataUrl);
    }
  };

  return (
    <div className="card">
      <div className="flex justify-center">
        <div className="flex-flex-col gap-4 items-center">
          <div className="text-2xl text-center font-semibold">
            Tire uma foto da nota a pagar
          </div>
          <FcCompactCamera
            onClick={startCamera}
            className={`m-auto ${showCamera ? 'hidden' : 'block'}`}
            size={50}
          />
        </div>
      </div>
      <div className="relative mb-4">
        <video
          className={`${showCamera ? 'block' : 'hidden'}`}
          ref={videoRef}
          autoPlay
          playsInline
        />
        <div
          className={`${
            showCamera ? 'block' : 'hidden'
          } absolute bottom-4 left-1/2 transform -translate-x-1/2`}
          onClick={takePicture}
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-slate-100">
            <FiCamera className="text-white text-2xl" />
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraComponent;
