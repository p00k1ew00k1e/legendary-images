import { Delete } from "@mui/icons-material";
import { ImageList, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import { deleteSingleImage } from "../../API/apiActions";
import type { ImageDetails } from "../../types/ImageDetails";
import { useEffect, useState } from "react";

function ImageDisplay(props: {images: ImageDetails[], imageCallback: (imgsUpdated:number) => void}) {
  const [reload, setReload] = useState(0);
  
  async function handleDelete(filename: string) {
    try {
      await deleteSingleImage(filename);
      setReload((prev) => prev + 1);
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    props.imageCallback(reload);
  }, [reload, props.imageCallback])
      
  return (
      <>
      <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
          {props.images.map((image) => (
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
export default ImageDisplay;