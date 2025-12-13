import uploadOnCloudinary from "../config/cloudinary.config.js";
import pool from "../config/db.js";


// CREATE Intern
export const createIntern = async (req, res) => {
  try {
    let profile_picture = null;

    if (req.file) {
       profile_picture = await uploadOnCloudinary(req.file.path);
      
    }

    const { name, role, description, address, mobile, email, google_scholar } = req.body;

    await pool.query(
      `INSERT INTO Interns 
      (name, role, description, profile_picture, address, mobile, email, google_scholar)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, role, description, profile_picture, address, mobile, email, google_scholar]
    );

    res.json({ message: "Intern created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL Interns
export const getInterns = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Interns ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET Intern by ID (UUID)
export const getInternById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM Interns WHERE intern_id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Intern not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Intern
export const updateIntern = async (req, res) => {
  const { id } = req.params;

  try {
    let updates = { ...req.body };

    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path);
      updates.profile_picture = uploaded;
    }

    await pool.query("UPDATE Interns SET ? WHERE intern_id = ?", [updates, id]);

    res.json({ message: "Intern updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Intern
export const deleteIntern = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM Interns WHERE intern_id = ?", [id]);
    res.json({ message: "Intern deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};