// controllers/AdminController.js
import db from "../config/db.js";
import uploadOnCloudinary from "../config/cloudinary.config.js";
// Upload image helper

// CREATE ADMIN
export const createAdmininfo = async (req, res) => {
  try {
    let profile_picture = null;

    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      profile_picture = uploadResult;
    }

    const {
      name,
      role,
      description,
      labInfo,
      address,
      mobile,
      email,
      google_scholar,
    } = req.body;

    await db.query(
      `INSERT INTO AdminInfo
        (name, role, description, labInfo, profile_picture, address, mobile, email, google_scholar)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        role,
        description,
        labInfo,
        profile_picture,
        address,
        mobile,
        email,
        google_scholar,
      ]
    );

    res.json({
      message: "Admin created successfully",
      profile_picture,
    });
  } catch (err) {
    console.error("INSERT ERROR:", err);
    res.status(500).json({ error: "Insert failed", details: err });
  }
};

export const getAllAdminsinfo = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM AdminInfo ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch admin info" });
  }
};

export const getAdminInfoById = async (req, res) => {
  try {
    const adminId = req.params.Id;

    const [rows] = await db.query(
      "SELECT * FROM AdminInfo WHERE adminIndo_id = ?",
      [adminId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("GET ADMIN BY ID ERROR:", err);
    res.status(500).json({ error: "Failed to fetch admin info", details: err });
  }
};

// UPDATE ADMIN
export const updateAdmininfo = async (req, res) => {
  try {
    const adminId = req.params.id;

    // Get existing admin to preserve old image
    const [existing] = await db.query(
      "SELECT profile_picture FROM AdminInfo WHERE adminIndo_id = ?",
      [adminId]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    let profile_picture = existing[0].profile_picture;

    // If new file uploaded, replace image
    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path);
      profile_picture = uploaded // IMPORTANT
    }

    const {
      name,
      role,
      description,
      labInfo,
      address,
      mobile,
      email,
      google_scholar,
    } = req.body;

    await db.query(
      `UPDATE AdminInfo SET 
          name=?, 
          role=?, 
          description=?, 
          profile_picture=?, 
          labInfo=?, 
          address=?, 
          mobile=?, 
          email=?, 
          google_scholar=?
       WHERE adminIndo_id=?`,
      [
        name,
        role,
        description,
        profile_picture,
        labInfo,   // ✔ FIXED POSITION
        address,   // ✔ FIXED POSITION
        mobile,
        email,
        google_scholar,
        adminId,
      ]
    );

    res.json({
      message: "Admin updated successfully",
      profile_picture,
    });

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Update failed", details: err });
  }
};
