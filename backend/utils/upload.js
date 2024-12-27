import multer from 'multer'
import storage from './fileUpload.js' // This imports the storage configuration file

// Initialize multer with the storage configuration
const upload = multer({ storage }).array('images', 5)

export default upload
