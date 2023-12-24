import { useRef, useEffect } from 'react'
import './App.css'
import * as facemash from '@tensorflow-models/face-landmarks-detection';
import Webcam from 'react-webcam';


export default function App() {

  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  const runFacemesh = async () => {
    const net = await facemash.load(facemash.SupportedPackage.mediapipeFacemesh)
  }

  const detect = async (net) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      // get video properties 

      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      // set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // detection
      const face = await net.estimateFace({ input: video })
      console.log(face);

      // ctx get from canvas
      const ctx = canvasRef.current.getContext('2d');
      requestAnimationFrame(()=>{
        
      })

    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Webcam ref={webcamRef} className='webcam' />
        <canvas ref={canvasRef} className='canvas' />

      </header>
    </div>
  )
}
