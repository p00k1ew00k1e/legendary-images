import { useEffect, useRef, useState } from 'react';
import { fetchImageList, upLoadImage, deleteSingleImage } from './API/apiActions';
import { Button, IconButton, ImageList, ImageListItem, ImageListItemBar, TextField, Typography } from '@mui/material';
import type { ImageDetails } from './types/ImageDetails';
import { Delete } from '@mui/icons-material';


function App() {
  // const [currentFile, setCurrentFile] = useState<File | null>(null);
  // // const {uploadedImages, matchFiles} = useMatchingFiles();
  // const {images, loadImages} = useLoadImages();

  // const fileUploadRef = useRef<HTMLInputElement>(null);
  // const handleUpload = () => {
  //   fileUploadRef.current?.click();
  //   setCurrentFile(fileUploadRef.current?.files?.[0] || null);

  // }
  // const fileSelectionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     upLoadImage(file);
  //   }
  //   //Loading logic, success logic, failure logic
  // }

  const [images, setImages] = useState<ImageDetails[]>([]);
  
  useEffect(() => {
    async function loadAllImages() {
      try {
        const imageList = await fetchImageList();
        setImages(imageList);
      } catch {
        console.log("Error reading files")
      }
    }
    loadAllImages();
  }, []);
    
  async function handleDelete(filename: string) {
    console.log(filename)
    try {
      await deleteSingleImage(filename);
      // reload with rerender
    } catch {
      console.log("Couldn't delete file")
    }
  }
/* TODO: 
1. Textarea don't search on each change
2. input client side validation for files size and type
3. Add success or fail alerts
4. Conditional number of images/none content
5. Remove console logs
6. loading="lazy" depending on how many images
7. Cleanup image download stuff
*/
  return (
    <>
      {/* <TextField 
        placeholder="Search images..."
        size="small"
        value={currentFile}
        onChange={matchFiles}
        slotProps={{
          htmlInput:{
            'aria-label':"Search by filename with partial matches"}}
          }
        id="search-filename" 
      /> */}

      {/* <input 
        hidden 
        ref={fileUploadRef} 
        type="file" 
        onChange={fileSelectionChanged}
        value="Something"
      /> 
      <Button type="button" variant="outlined" onClick={handleUpload}>Upload</Button> */}

      <Typography variant="body1">{images.length} images uploaded</Typography>
      
      <ImageList rowHeight={160} cols={2}>
        {images.map((image) => (
          <ImageListItem key={image.filename}>
            <img 
              src={image.url}
              alt={image.filename}        
            />
            <ImageListItemBar
              title={image.filename}
              actionIcon={
                <IconButton 
                aria-label={`delete file ${image.filename}`}
                onClick={() => handleDelete(image.filename)}>
                  <Delete />
                </IconButton>
              }
            />
          </ImageListItem>
        )
      )}
        
          
      </ImageList>

      
      </>
  )   
}

export default App
