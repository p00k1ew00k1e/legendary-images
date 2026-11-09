import { useRef, useState } from 'react';
import './App.css'
import { fetchImages, upLoadImage } from './API/apiActions';

const useMatchingFiles = () => {
  const [uploadedImages, setUploadedImages] = useState(['']);
      
    async function matchFiles() {
      try {
        const res = await fetchImages();
        setUploadedImages(res);
      } catch (error) {
        console.log("Error")
      }
    }
    return {uploadedImages, matchFiles} 
}

function App() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const {uploadedImages, matchFiles} = useMatchingFiles();

  const fileUploadRef = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    fileUploadRef.current?.click();
    setCurrentFile(fileUploadRef.current?.files?.[0] || null);

  }
  const fileSelectionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      upLoadImage(file);
    }
    //Loading logic, success logic, failure logic
  }
    
  

  return (
    <>
    <div className='Upload block'> 
      <button type="button" onClick={handleUpload}>Upload</button>
      <input hidden ref={fileUploadRef} type="file" onChange={fileSelectionChanged}/> 
    </div>
    <div className="Search partial ok"><br></br>
      <button type="button" onClick={matchFiles}> Show uploaded files </button>
      <ul>
        <br></br> 
        {uploadedImages}
        <br></br>
        Delete logic will go here per file
      </ul>
    </div>
    </>
  )
}

export default App
