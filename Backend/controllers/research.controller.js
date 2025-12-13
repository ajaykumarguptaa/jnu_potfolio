import pool from "../config/db.js";

// Get all research
export const getResearch = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        research_id,
        research_title,
        field,
        description
      FROM research_work
      ORDER BY research_title ASC
    `);

    res.status(200).json({
      success: true,
      message: "Research work retrieved successfully",
      data: rows,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// Get by ID
export const getResearchById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM research_work WHERE research_id=?", [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create research
export const createResearch = async (req, res) => {
  const { research_title, field, description, admin_id } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO research_work (research_title, field, description, admin_id) VALUES (?,?,?,?)",
      [research_title, field, description, admin_id]
    );
    res.json({ message: "Research added", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update research
export const updateResearch = async (req, res) => {
  const { id } = req.params;
  const { research_title, field, description } = req.body;

  try {
    await pool.query(
      "UPDATE research_work SET research_title=?, field=?, description=? WHERE research_id=?",
      [research_title, field, description, id]
    );
    res.json({ message: " Research updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete research
export const deleteResearch = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM research_work WHERE research_id=?", [id]);
    res.json({ message: " Research deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
