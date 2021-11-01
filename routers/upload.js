const router = require("express").Router();
const cloudinary = require("cloudinary");
const fs = require("fs");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router.post('/upload', auth, authAdmin, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "No uploaded files" });
    const file = req.files.file;
    if (file.size > 1024 * 2024){   
        removeTemp(file.tempFilePath)
        return res.status(400).json({ msg: "File is too large" });}
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ){
        removeTemp(file.tempFilePath)
        return res.status(400).json({ msg: "Unsupported image format" });
    }
      

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      async (err, result) => {
        if (err) throw err;
        removeTemp(file.tempFilePath)
        return res.json({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.post('/destroy', auth, authAdmin, (req, res) => {
    try {
        const { public_id } = req.body;
        if(!public_id) {
            return res.status(400).json({msg: 'No image selected'})
        }
        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if(err) throw err;
            return res.json({ msg: "Image deleted" });
        })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
})

const removeTemp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}


module.exports = router;
