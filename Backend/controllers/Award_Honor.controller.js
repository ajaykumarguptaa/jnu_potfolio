import db from "../config/db.js";

export const createAward = async (req, res) => {
  const { title, organisation, department, duration } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO award_Honors (title, organisation, department, duration)
       VALUES (?, ?, ?, ?)`,
      [title || null, organisation, department, duration]
    );

    res.json({ message: "Award Added", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAwards = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM award_Honors`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAward = async (req, res) => {
  const { id } = req.params;
  const { organisation, department, duration } = req.body;

  try {
    await db.query(
      `UPDATE award_Honors SET organisation=?, department=?, duration=? WHERE award_id=?`,
      [organisation, department, duration, id]
    );
    res.json({ message: "Award updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAward = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(`DELETE FROM award_Honors WHERE award_id=?`, [id]);
    res.json({ message: "Award deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
