
export async function fetchImages(imageName = ''): Promise<string[]> {
    const response = await fetch('/api/images?imageName=' + imageName);
    if (!response.ok) {
        throw new Error('Failed to fetch images');
    }
    const data = await response.json();
    return data.map((image: { filename: string }) => image.filename);
}

export async function deleteSingleImage(filename: string): Promise<void> {
    const response = await fetch(`/api/images/${filename}`, {
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