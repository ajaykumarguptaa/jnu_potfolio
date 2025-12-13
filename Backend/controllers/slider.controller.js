import db from "../config/db.js";
import uploadOnCloudinary from "../config/cloudinary.config.js";

export const createSlider = async (req, res) => {
  const { image_url, caption } = req.body;

  try {
    let image_url = "";
    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path);
      image_url = uploaded?.url;
    }
    const [result] = await db.query(
      `INSERT INTO slider (image_url, caption) VALUES (?, ?)`,
      [image_url, caption]
    );

    res.json({ message: "Slider created", slider_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getSliders = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM slider ORDER BY created_at DESC`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getSliderById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(`SELECT * FROM slider WHERE slider_id = ?`, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Slider not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateSlider = async (req, res) => {
  const { id } = req.params;
  const { image_url, caption } = req.body;

  try {
      let image_url = "";
    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path);
      image_url = uploaded?.url;
    }
    const [result] = await db.query(
      `UPDATE slider SET image_url = ?, caption = ? WHERE slider_id = ?`,
      [image_url, caption, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Slider not found" });
    }

    res.json({ message: "Slider updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteSlider = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(`DELETE FROM slider WHERE slider_id = ?`, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Slider not found" });
    }

    res.json({ message: "Slider deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
