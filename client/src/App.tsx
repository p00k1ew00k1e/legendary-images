import { useEffect, useState } from 'react';
import { fetchImageList} from './API/apiActions';
import type { ImageDetails } from './types/ImageDetails';
import ImageDisplay from './components/imageDisplay/ImageDisplay';
import ImageUpload from './components/ImageUpload/ImageUpload';
import { Box, Container, Paper, Typography } from '@mui/material';
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
      <Container maxWidth="md" sx={{py: 4}}>
        <Paper variant="outlined" sx={{p: { xs:2, sm:3}}}>
          <Box sx={{display: 'flex', gap:2, mb: 3}}>
            <ImageSearch searchCallback={setSearch}/>
            <ImageUpload imageCallback={setImgsUpdate}/>
          </Box>

          <Typography component="span" color="text.secondary" sx={{fontWeight:600}} variant="body1">{images.length} images </Typography>
          
          <ImageDisplay imageCallback={setImgsUpdate} images={images}/>

        </Paper>
      </Container>
    </>
  )   
}

export default App
