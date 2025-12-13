// CREATE
import db from "../config/db.js";

export const createAdministrativeActivity = async (req, res) => {
  const { title, description, duration } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO administrative_position_Activities (title, description, duration) VALUES (?, ?, ?)`,
      [title, description, duration]
    );
    res.json({ message: "Activity created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
export const getAdministrativeActivities = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM administrative_position_Activities`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE
export const updateAdministrativeActivity = async (req, res) => {
  const { id } = req.params;
  const { title, description, duration } = req.body;

  try {
    await db.query(
      `UPDATE administrative_position_Activities SET title=?, description=?, duration=? WHERE administrative_id=?`,
      [title, description, duration, id]
    );
    res.json({ message: "Activity updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteAdministrativeActivity = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM administrative_position_Activities WHERE administrative_id=?`, [id]);
    res.json({ message: "Activity deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
