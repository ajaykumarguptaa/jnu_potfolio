import db from "../config/db.js";

export const createAcademicCareer = async (req, res) => {
  const { title, organisation, duration, role } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO academic_career (title, organisation, duration, role) VALUES (?, ?, ?, ?)`,
      [title, organisation, duration, role]
    );
    res.json({ message: "Academic career created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAcademicCareers = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM academic_career`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAcademicCareer = async (req, res) => {
  const { id } = req.params;
  const { title, organisation, duration, role } = req.body;

  try {
    await db.query(
      `UPDATE academic_career SET title=?, organisation=?, duration=?, role=? WHERE academic_id=?`,
      [title, organisation, duration, role, id]
    );
    res.json({ message: "Academic career updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAcademicCareer = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(`DELETE FROM academic_career WHERE academic_id=?`, [id]);
    res.json({ message: "Academic career deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
