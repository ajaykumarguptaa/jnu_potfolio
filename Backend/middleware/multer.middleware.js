import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const unqueSuffx = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + unqueSuffx + extension);
  },
});
const upload = multer({ storage });

export default upload;
