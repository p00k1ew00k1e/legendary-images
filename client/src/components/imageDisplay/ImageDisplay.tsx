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
      <ImageList gap={16} sx={{overflow: 'visible, m:0'}} cols={2} rowHeight={140}>
          {props.images.map((image) => (
        <ImageListItem key={image.filename}>
            <img 
            src={image.url}
            alt={image.filename}  
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}      
            />
            <ImageListItemBar
            title={image.filename}
            actionIcon={
            <IconButton 
              aria-label={`delete file ${image.filename}`}
              onClick={() => handleDelete(image.filename)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "common.white",
              }}>
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