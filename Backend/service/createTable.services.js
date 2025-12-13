import db from "../config/db.js";

export const createTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS admin (
        admin_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        admin_user_name VARCHAR(255) NOT NULL,
        admin_email VARCHAR(255) UNIQUE NOT NULL,
        admin_password VARCHAR(255) NOT NULL,
        admin_profile_picture VARCHAR(255), 
        reset_token VARCHAR(255),
        reset_expires DATETIME,
        otp_code VARCHAR(10) NULL,
        otp_expires DATETIME NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // LIMIT ADMIN TO MAX 5 RECORDS
    await db.query(`DROP TRIGGER IF EXISTS limit_admin_insert`);
    await db.query(`
      CREATE TRIGGER limit_admin_insert
      BEFORE INSERT ON admin
      FOR EACH ROW
      BEGIN
        DECLARE admin_count INT;
        SELECT COUNT(*) INTO admin_count FROM admin;
        IF admin_count >= 5 THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'Admin limit reached. Maximum 5 admins allowed';
        END IF;
      END
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS event (
        event_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        event_title VARCHAR(255),
        event_description TEXT,
        event_venue VARCHAR(255),
        event_date DATE,
        event_time TIME,
        admin_id CHAR(36),
        FOREIGN KEY (admin_id) REFERENCES admin(admin_id) ON DELETE CASCADE
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS project (
        project_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        project_title VARCHAR(255),
        organization VARCHAR(255),
        description TEXT,
        project_date DATE,
        admin_id CHAR(36),
        FOREIGN KEY (admin_id) REFERENCES admin(admin_id) ON DELETE CASCADE
      )
    `);

    await db.query(`
    CREATE TABLE IF NOT EXISTS research_work (
    research_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    research_title VARCHAR(255),
    field VARCHAR(255),
    description TEXT
);
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS members (
        member_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        member_name VARCHAR(255),
        role VARCHAR(255),
        profile_picture VARCHAR(255),
        description TEXT,
        admin_id CHAR(36),
        FOREIGN KEY (admin_id) REFERENCES admin(admin_id) ON DELETE CASCADE
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS member_experience (
        exp_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        company_name VARCHAR(255),
        position VARCHAR(255),
        start_date DATE,
        end_date DATE,
        member_id CHAR(36),
        FOREIGN KEY (member_id) REFERENCES members(member_id) ON DELETE CASCADE
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS forget_pass (
        reset_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        token CHAR(36) DEFAULT (UUID()),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        admin_id CHAR(36),
        FOREIGN KEY (admin_id) REFERENCES admin(admin_id) ON DELETE CASCADE
      )
    `);
    await db.query(`
          CREATE TABLE IF NOT EXISTS administrative_position_Activities (
          administrative_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
          title VARCHAR(150) NOT NULL,
          description TEXT,
          duration VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    await db.query(`
         CREATE TABLE IF NOT EXISTS award_Honors (
          award_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
          organisation VARCHAR(150) NOT NULL,
          department VARCHAR(150),
          duration VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
      `);
    await db.query(`
         CREATE TABLE IF NOT EXISTS academic_career (
    academic_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(150) NOT NULL,
    organisation VARCHAR(150) NOT NULL,
    duration VARCHAR(100),
    role VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

      `);
    await db.query(`
         CREATE TABLE IF NOT EXISTS other_activities (
    activity_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    organisation VARCHAR(150) NOT NULL,
    duration VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
      `);

    await db.query(`
          CREATE TABLE IF NOT EXISTS slider (
          slider_id INT PRIMARY KEY AUTO_INCREMENT,
          image_url VARCHAR(255) NOT NULL,
          caption VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `);
    await db.query(`
          CREATE TABLE IF NOT EXISTS photo_gallery (
          photo_id INT PRIMARY KEY AUTO_INCREMENT,
          photo_url VARCHAR(255) NOT NULL,
          caption VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `);

    await db.query(`
   CREATE TABLE IF NOT EXISTS Alumni (
    Alunni_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(150) NOT NULL,
    role VARCHAR(100),
    description TEXT,
    profile_picture VARCHAR(500),
    education TEXT,
    research_interests TEXT,
    address VARCHAR(255),
    mobile VARCHAR(20),
    email VARCHAR(150),
    linkedin VARCHAR(300),
    google_scholar VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
 `);

    await db.query(`
 CREATE TABLE IF NOT EXISTS Interns (
    intern_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),

  
    name VARCHAR(150) NOT NULL,
    role VARCHAR(50) DEFAULT 'Intern',
    description TEXT DEFAULT NULL,
    profile_picture VARCHAR(500),
    address VARCHAR(255) DEFAULT NULL,
    mobile VARCHAR(20) DEFAULT NULL,
    email VARCHAR(150) DEFAULT NULL,
    google_scholar VARCHAR(300) DEFAULT NULL,

   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
);

 `);

    await db.query(`
 CREATE TABLE IF NOT EXISTS AdminInfo (
    adminIndo_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),

  
    name VARCHAR(150) NOT NULL,
    role VARCHAR(50) DEFAULT 'Intern',
    description MEDIUMTEXT DEFAULT NULL,
    labInfo MEDIUMTEXT DEFAULT NULL,

    profile_picture VARCHAR(500),
    address TEXT DEFAULT NULL,
    mobile VARCHAR(20) DEFAULT NULL,
    email VARCHAR(150) DEFAULT NULL,
    google_scholar VARCHAR(300) DEFAULT NULL,

   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
);

 `);

    console.log(" Tables created and admin limit enforced,uuid id");
  } catch (error) {
    console.error(" Table creation failed:", error.message);
  }
};
