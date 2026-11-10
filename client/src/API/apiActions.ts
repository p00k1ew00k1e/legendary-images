import type { ImageDetails } from "../types/ImageDetails";

export async function fetchImageList(imageName=''): Promise<ImageDetails[]> {
    const response = await fetch('/api/images?imageName=' + encodeURIComponent(imageName));
    if (!response.ok) {
        throw new Error('Failed to fetch images');
    }
    const images = await response.json();
    return images;
    //return data.map((image: { filename: string }) => image.filename);
} 


// export async function fetchImage(fileName: string): Promise<string> {
//     const response = await fetch('/api/images?imageName=' + fileName);
//     if (!response.ok) {
//         throw new Error('Failed to fetch images');
//     }
//     const blob = await response.blob();
//     return window.URL.createObjectURL(blob);

//     // https://developer.mozilla.org/en-US/docs/Web/API/Response/blob not json
    
// }

export async function deleteSingleImage(filename: string): Promise<void> {
    const response = await fetch(`/api/images/${encodeURIComponent(filename)}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete image');
    }
}

export async function upLoadImage(file:File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/images', {
        method: 'POST',
        body: formData
    });
    if (!response.ok) {
        throw new Error('Failed to upload image');
    }
}