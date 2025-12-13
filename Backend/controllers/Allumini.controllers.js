import pool from "../config/db.js";

import uploadOnCloudinary from "../config/cloudinary.config.js";

export const createAlumni = async (req, res) => {
  try {
   let profile_picture = null;

  if (req.file) {
    // console.log("file comes😂 ");

    profile_picture = await uploadOnCloudinary(req.file.path);
    // console.log("file comes😂 ",profile_picture);
  }


    const {
      name, role, description,
      education, research_interests,
      address, mobile, email, linkedin, google_scholar
    } = req.body;

    await pool.query(
      `INSERT INTO Alumni
      (name, role, description, profile_picture, education, research_interests,
       address, mobile, email, linkedin, google_scholar)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, role, description, profile_picture,
        education, research_interests,
        address, mobile, email, linkedin, google_scholar
      ]
    );

    res.json({ message: "Member created successfully", image: profile_picture });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getAlumni = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Alumni ORDER BY Alunni_id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getAlumniMemberById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM Alumni WHERE Alunni_id = ?",  // ← change here
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const updateMemberAlumni = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      name,
      role,
      description,
      education,
      research_interests,
      address,
      mobile,
      email,
      linkedin,
      google_scholar
    } = req.body;

    let profile_picture = null;

  if (req.file) {
    // console.log("file comes😂 ");

    profile_picture = await uploadOnCloudinary(req.file.path);
    // console.log("file comes😂 ",profile_picture);
  }


    const updatedFields = {
      name,
      role,
      description,
      education,
      research_interests,
      address,
      mobile,
      email,
      linkedin,
      google_scholar,
    };

    if (profile_picture) updatedFields.profile_picture = profile_picture;

    // IMPORTANT: correct table + correct ID column
    await pool.query(
      "UPDATE Alumni SET ? WHERE Alunni_id = ?",
      [updatedFields, id]
    );

    res.json({ message: "Alumni member updated successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const deleteMemberAlumni = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM Alumni WHERE alunni_id = ?", [id]);
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
