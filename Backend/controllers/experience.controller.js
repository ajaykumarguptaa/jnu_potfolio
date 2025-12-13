import pool from "../config/db.js";

// Get all experiences
export const getExperiences = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.*, m.member_name
      FROM member_experience e
      JOIN members m ON e.member_id = m.member_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create experience
export const createExperience = async (req, res) => {
  const { company_name, position, start_date, end_date, member_id } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO member_experience (company_name, position, start_date, end_date, member_id) VALUES (?,?,?,?,?)",
      [company_name, position, start_date, end_date, member_id]
    );
    res.json({ message: " Experience added", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete experience
export const deleteExperience = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM member_experience WHERE exp_id=?", [id]);
    res.json({ message: " Experience deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
