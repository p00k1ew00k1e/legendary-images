import { useEffect, useState } from 'react';
import { fetchImageList} from './API/apiActions';
import type { ImageDetails } from './types/ImageDetails';
import ImageDisplay from './components/imageDisplay/ImageDisplay';
import ImageUpload from './components/ImageUpload/ImageUpload';
import { Typography } from '@mui/material';
import ImageSearch from './components/ImageSearch/ImageSearch';

function App() {
  
  const [images, setImages] = useState<ImageDetails[]>([]);
  const [search, setSearch] = useState('');
  const [imgsUpdate, setImgsUpdate] = useState(0)

  useEffect(() => {
    async function loadImages() {
      try {
        const imageList = await fetchImageList(search);
        setImages(imageList);
      } catch {
        console.log("Error reading files")
      }
    }
    loadImages();
  }, [search, imgsUpdate]);
    
  return (
    <>

      <ImageSearch searchCallback={setSearch}/>

      <ImageUpload imageCallback={setImgsUpdate}/>

      <Typography variant="body1">{images.length} images </Typography>
      
      <ImageDisplay imageCallback={setImgsUpdate} images={images}/>
      
    </>
  )   
}

export default App
