import pool from "../config/db.js";

// GET ALL EVENTS

export const getEvents = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.*, a.admin_user_name
      FROM event e
      LEFT JOIN admin a ON e.admin_id = a.admin_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET EVENT BY ID
export const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM event WHERE event_id = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE EVENT
export const createEvent = async (req, res) => {
  const {
    event_title,
    event_description,
    event_venue,
    event_date,
    event_time,
    admin_id,
    admin_user_name
  } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO event (event_title, event_description, event_venue, event_date, event_time, admin_id) VALUES (?, ?, ?, ?, ?, ?)",
      [event_title, event_description, event_venue, event_date, event_time, admin_id]
    );
    res.json({ message: " Event created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { event_title, event_description, event_venue } = req.body;

  try {
    await pool.query(
      "UPDATE event SET event_title=?, event_description=?, event_venue=? WHERE event_id=?",
      [event_title, event_description, event_venue, id]
    );
    res.json({ message: " Event updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM event WHERE event_id=?",
      [id]
    );
    res.json({ message: " Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
