import uploadOnCloudinary from "../config/cloudinary.config.js";
import pool from "../config/db.js";
import db from "../config/db.js"

export const getAdmin = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM admin`);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching admin:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const {
      admin_user_name,
      admin_email,
      admin_password,
      admin_profile_picture,
    } = req.body;

    let photoPath = "";
    if ((req, file)) {
      const uplosded = await uploadOnCloudinary(req, file.path);
      photoPath = uplosded?.url;
    }

    const [result] = await pool.query(
      "INSERT INTO admin (admin_user_name, admin_email, admin_password, admin_profile_picture) VALUES (?, ?, ?, ?)",
      [admin_user_name, admin_email, admin_password, photoPath]
    );
    res.json({ message: "Admin created ", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const {
    admin_user_name,
    admin_email,
    admin_password,
    admin_profile_picture,
  } = req.body;
  try {
    let photoPath = "";
    if ((req, file)) {
      const uplosded = await uploadOnCloudinary(req, file.path);
      photoPath = uplosded?.url;
    }

    await pool.query(
      "UPDATE admin SET admin_user_name=?, admin_email=?, admin_password=?, admin_profile_picture=? WHERE admin_id=?",
      [admin_user_name, admin_email, admin_password, photoPath, id]
    );
    res.json({ message: "Admin updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Count admins
    const [count] = await db.query("SELECT COUNT(*) AS total FROM admin");
    if (count[0].total <= 1) {
      return res.status(403).json({
        message: "At least 1 admin must remain. Cannot delete the last admin.",
        success: false
      });
    }

    // Check if user exists
    const [rows] = await db.query("SELECT * FROM admin WHERE admin_id=?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Admin not found", success: false });
    }

    // Delete admin
    await db.query("DELETE FROM admin WHERE admin_id=?", [id]);

    res.json({ message: "Admin deleted successfully", success: true });

  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};
