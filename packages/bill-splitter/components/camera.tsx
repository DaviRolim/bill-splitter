import React, { useState, useRef } from 'react';

const CameraComponent: React.FC = () => {
  const [imageData, setImageData] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.log(`Error accessing camera: ${error}`);
      });
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      videoRef.current!.srcObject = null;
    }
  };

  const handleOnAnalyzeClick = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const requestBody = { image: imageData };
    console.log('imageData', imageData);
    console.log('process.env.API_URL', process.env.NEXT_PUBLIC_API_URL)
    fetch(apiUrl!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: imageData//JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.videoWidth || 0;
      canvas.height = video.videoHeight || 0;
      canvas.getContext('2d')?.drawImage(video, 0, 0);

      const dataUrl = canvas.toDataURL('image/png');
      setImageData(dataUrl);
      // console.log('dataUrl', dataUrl)
      stopCamera();
      
      // Send imageData to API
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={takePicture}>Take Picture</button>
      <button onClick={handleOnAnalyzeClick}>Analyze Expense</button>
      {imageData && (
        <div>
          <h2>Preview:</h2>
          <img src={imageData} alt="Preview" />
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraComponent;
