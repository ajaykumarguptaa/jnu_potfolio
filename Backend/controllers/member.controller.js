import pool from "../config/db.js";
import uploadOnCloudinary from "../config/cloudinary.config.js";
import path from "path";

// ➤ Get ALL members
export const getMembers = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT m.*, a.admin_user_name
      FROM members m
      LEFT JOIN admin a ON m.admin_id = a.admin_id
    `);

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Get member by ID
export const getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`SELECT * FROM members WHERE member_id=?`, [
      id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ CREATE member
// export const createMember = async (req, res) => {
//   const { member_name, role, description, admin_id } = req.body;

//   let profile_picture = null;
//   if (req.file) {
//     profile_picture = await uploadOnCloudinary(req.file.path);

//   }

//   try {
//     const [result] = await pool.query(
//       `INSERT INTO members (member_name, role, profile_picture, description, admin_id)
// VALUES (?,?,?,?,?)`,
//       [member_name, role, profile_picture, description, admin_id]
//     );

//     res.status(200).json({
//       message: "Member created successfully",
//       member_id: result.insertId,
//       image_url: profile_picture,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
export const createMember = async (req, res) => {
  try {
    const { member_name, role, description, admin_id } = req.body;

    let profile_picture = null;

    if (req.file) {
      console.log("file comes😂 ");

      profile_picture = await uploadOnCloudinary(req.file.path);
      console.log("file comes😂 ",profile_picture);
    }

    const [result] = await pool.query(
      "INSERT INTO members (member_name, role, profile_picture, description, admin_id) VALUES (?,?,?,?,?)",
      [member_name, role, profile_picture, description, admin_id]
    );

    res.json({
      message: "Member created successfully",
      id: result.insertId,
      profile_picture,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ UPDATE member
export const updateMember = async (req, res) => {
  const { id } = req.params;
  const { member_name, role, description } = req.body;

 let profile_picture = null;

  if (req.file) {
    // console.log("file comes😂 ");

    profile_picture = await uploadOnCloudinary(req.file.path);
    // console.log("file comes😂 ",profile_picture);
  }


  try {
    await pool.query(
      `UPDATE members 
       SET member_name=?, role=?, profile_picture=?, description=?
       WHERE member_id=?`,
      [member_name, role, profile_picture, description, id]
    );

    res.json({ message: "Member updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ DELETE member
export const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM members WHERE member_id=?`, [id]);
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get member with experience
// export const getMemberWithExperience = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [rows] = await pool.query(`
//       SELECT m.member_name, e.company_name, e.position, e.start_date, e.end_date
//       FROM members m
//       JOIN member_experience e ON m.member_id = e.member_id
//       WHERE m.member_id = ?
//     `, [id]);

//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
