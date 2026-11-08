React + TS

● Upload images and store them using an API
● Search for images by name using an input box and the API
● List all uploaded images
● Delete single image

Create type for image 
ImageDetails {
  id: string,
  name: string,
  size: number,
  ext: string,
  path: string,
  uploadDetails: {
    userId: name,
    uploadedAt: string (could use datetime)
  }
}
write out fetches for search, upload and delete so this functiuonality stays out of the components

● Style the page to your liking
Use semantic elements 
create page, searchinput, gridview with delete option (not specified on image)
Might have to change display strategy for large number of files/ paginated view or table with expandable row

Styling: Will start with MAT UI 
Tests