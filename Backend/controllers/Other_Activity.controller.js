import db from "../config/db.js";

export const createOtherActivity = async (req, res) => {
  const { organisation, duration, description } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO other_activities (organisation, duration, description) VALUES (?, ?, ?)`,
      [organisation, duration, description]
    );
    res.json({ message: "Other activity created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOtherActivities = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM other_activities`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 

export const updateOtherActivity = async (req, res) => {
  const { id } = req.params;
  const { organisation, duration, description } = req.body;

  try {
    await db.query(
      `UPDATE other_activities SET organisation=?, duration=?, description=? WHERE activity_id=?`,
      [organisation, duration, description, id]
    );
    res.json({ message: "Other activity updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteOtherActivity = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(`DELETE FROM other_activities WHERE activity_id=?`, [id]);
    res.json({ message: "Other activity deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
