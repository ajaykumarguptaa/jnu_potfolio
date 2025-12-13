import pool from "../config/db.js";

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        project_id,
        project_title,
        organization,
        description,
        project_date
      FROM project
      ORDER BY project_date DESC
    `);

    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      data: rows,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// Get project by ID
export const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM project WHERE project_id = ?", [id]);
    res.status(200).json({
     data: rows[0],
      message: "Project retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create project
export const createProject = async (req, res) => {
  const { project_title, organization, description, project_date, admin_id } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO project (project_title, organization, description, project_date, admin_id) VALUES (?,?,?,?,?)",
      [project_title, organization, description, project_date, admin_id]
    );
    res.status(201).json({ message: "Project added", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { project_title, organization, description, project_date } = req.body;

  try {
    await pool.query(
      "UPDATE project SET project_title=?, organization=?, description=?, project_date=? WHERE project_id=?",
      [project_title, organization, description, project_date, id]
    );
    res.status(200).json({ message: "Project updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM project WHERE project_id = ?", [id]);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
