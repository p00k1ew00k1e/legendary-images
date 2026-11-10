import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { upLoadImage } from "../../API/apiActions";

function ImageUpload(props:{imageCallback: (imgsUpdated:number) => void}) {
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [reload, setReload] = useState(0);

    const fileUploadRef = useRef<HTMLInputElement>(null);
    const handleUpload = () => {
    fileUploadRef.current?.click();
    setCurrentFile(fileUploadRef.current?.files?.[0] || null);
    }
    async function fileSelectionChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
        try {
        await upLoadImage(file);
        setReload((prev) => prev + 1);
        } catch (error) {
        console.log(error);
        }
    }
    }
    useEffect(() => {
        props.imageCallback(reload);
    }, [reload, props.imageCallback])

    return (
        <>
        <input 
            hidden 
            ref={fileUploadRef} 
            type="file" 
            onChange={fileSelectionChanged}
        /> 
        <Button type="button" variant="outlined" onClick={handleUpload}>Upload</Button>
        </>
    ); 
}

export default ImageUpload;