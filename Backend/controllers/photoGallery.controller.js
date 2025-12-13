import db from "../config/db.js";
import uploadOnCloudinary from "../config/cloudinary.config.js";

export const addPhoto = async (req, res) => {
  const { caption } = req.body;

  try {
    let profile_picture = null;

    if (req.file) {
      console.log("file comes😂 ");

      profile_picture = await uploadOnCloudinary(req.file.path);
      console.log("file comes😂 ",profile_picture);
    }
    const [result] = await db.query(
      `INSERT INTO photo_gallery (photo_url, caption) VALUES (?, ?)`,
      [profile_picture, caption]
    );

    res.status(201).json({ message: "Photo added", photo_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPhotos = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM photo_gallery ORDER BY photo_id DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT * FROM photo_gallery WHERE photo_id = ?`,
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "Photo not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { photo_url, caption } = req.body;

  try {
    let profile_picture = null;

    if (req.file) {
      // console.log("file comes😂 ");

      profile_picture = await uploadOnCloudinary(req.file.path);
      // console.log("file comes😂 ",profile_picture);
    }
    await db.query(
      `UPDATE photo_gallery SET photo_url = ?, caption = ? WHERE photo_id = ?`,
      [profile_picture, caption, id]
    );
    res.json({ message: "Photo updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePhoto = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(`DELETE FROM photo_gallery WHERE photo_id = ?`, [id]);
    res.json({ message: "Photo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
