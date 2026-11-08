Express serve with multer for file upload handling and cors

- Display 
Get from /uploadedImages/<imageName>

- Upload images and store them using an API
POST to /api/imageStore 

- Search for images by name using an input box and the API
GET from /api/imageStore?img=input

- List all uploaded images
GET from /api/imageStore

- Delete single image
DELETE /api/imageStore/:id Reponse Empty needs :id to be dynamic
Ref https://expressjs.com/en/5x/guide/routing/

Success and Error handling
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/201

Server -
    src (Code lives here)
    data (local store (use DB in actual prod code))
    uploads (files) gitkeep in empty dirs to maintain structure