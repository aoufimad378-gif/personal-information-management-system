require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('./db')

const app = express()
const PORT = 5050


// ======================================================
// MIDDLEWARE
// ======================================================

app.use(cors())
app.use(express.json())
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      message: 'Access token required'
    })
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (error, user) => {
      if (error) {
        return res.status(403).json({
          message: 'Invalid or expired token'
        })
      }

      req.user = user
      next()
    }
  )
}

// ======================================================
// BASIC SERVER TEST
// ======================================================

app.get('/', (req, res) => {
  res.send('Emergify backend is running')
})


// ======================================================
// DATABASE CONNECTION TEST
// ======================================================

app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')

    res.json({
      message: 'PostgreSQL connected successfully!',
      time: result.rows[0].now
    })
  } catch (error) {
    console.error('Database connection error:', error)

    res.status(500).json({
      message: 'Database connection failed'
    })
  }
})


// ======================================================
// GET ALL PROFILES
// ======================================================

app.get('/api/profiles', authenticateToken, async (req, res) => {  try {
    const result = await pool.query(`
      SELECT
        id,
        full_name AS "fullName",
        tc_number AS "tcNumber",
        phone,
        email,
        blood_type AS "bloodType",
        preferred_language AS "preferredLanguage",
        allergies,
        emergency_contact AS "emergencyContact",
        emergency_notes AS "emergencyNotes",
        created_at AS "createdAt",
        public_token AS "publicToken"
      FROM profiles
      ORDER BY id ASC
    `)

    res.json(result.rows)

  } catch (error) {
    console.error('Error loading profiles:', error)

    res.status(500).json({
      message: 'Error loading profiles'
    })
  }
})


// ======================================================
// CREATE PROFILE
// ======================================================

app.post('/api/profiles', authenticateToken, async (req, res) => {  try {
    const {
      fullName,
      tcNumber,
      phone,
      email,
      bloodType,
      preferredLanguage,
      allergies,
      emergencyContact,
      emergencyNotes
    } = req.body

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        message: 'Full name is required'
      })
    }

    const result = await pool.query(
      `
      INSERT INTO profiles (
        full_name,
        tc_number,
        phone,
        email,
        blood_type,
        preferred_language,
        allergies,
        emergency_contact,
        emergency_notes
      )

      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9
      )

      RETURNING
        id,
        full_name AS "fullName",
        tc_number AS "tcNumber",
        phone,
        email,
        blood_type AS "bloodType",
        preferred_language AS "preferredLanguage",
        allergies,
        emergency_contact AS "emergencyContact",
        emergency_notes AS "emergencyNotes",
        created_at AS "createdAt",
        public_token AS "publicToken"
      `,
      [
        fullName,
        tcNumber || null,
        phone || null,
        email || null,
        bloodType || null,
        preferredLanguage || null,
        allergies || null,
        emergencyContact || null,
        emergencyNotes || null
      ]
    )

    res.status(201).json(result.rows[0])

  } catch (error) {
    console.error('Error creating profile:', error)

    if (error.code === '23505') {
      return res.status(409).json({
        message: 'A profile with this TC number already exists'
      })
    }

    res.status(500).json({
      message: 'Error creating profile'
    })
  }
})


// ======================================================
// UPDATE PROFILE
// ======================================================

app.put('/api/profiles/:id', authenticateToken, async (req, res) => {  try {
    const id = req.params.id

    const {
      fullName,
      tcNumber,
      phone,
      email,
      bloodType,
      preferredLanguage,
      allergies,
      emergencyContact,
      emergencyNotes
    } = req.body

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        message: 'Full name is required'
      })
    }

    const result = await pool.query(
      `
      UPDATE profiles

      SET
        full_name = $1,
        tc_number = $2,
        phone = $3,
        email = $4,
        blood_type = $5,
        preferred_language = $6,
        allergies = $7,
        emergency_contact = $8,
        emergency_notes = $9

      WHERE id = $10

      RETURNING
        id,
        full_name AS "fullName",
        tc_number AS "tcNumber",
        phone,
        email,
        blood_type AS "bloodType",
        preferred_language AS "preferredLanguage",
        allergies,
        emergency_contact AS "emergencyContact",
        emergency_notes AS "emergencyNotes",
        created_at AS "createdAt",
        public_token AS "publicToken"
      `,
      [
        fullName,
        tcNumber || null,
        phone || null,
        email || null,
        bloodType || null,
        preferredLanguage || null,
        allergies || null,
        emergencyContact || null,
        emergencyNotes || null,
        id
      ]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Profile not found'
      })
    }

    res.json(result.rows[0])

  } catch (error) {
    console.error('Error updating profile:', error)

    if (error.code === '23505') {
      return res.status(409).json({
        message: 'A profile with this TC number already exists'
      })
    }

    res.status(500).json({
      message: 'Error updating profile'
    })
  }
})


// ======================================================
// DELETE PROFILE
// ======================================================

app.delete('/api/profiles/:id', authenticateToken, async (req, res) => {  try {
    const id = req.params.id

    const result = await pool.query(
      `
      DELETE FROM profiles
      WHERE id = $1
      RETURNING id
      `,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Profile not found'
      })
    }

    res.json({
      message: 'Profile deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting profile:', error)

    res.status(500).json({
      message: 'Error deleting profile'
    })
  }
})


// ======================================================
// PUBLIC EMERGENCY PROFILE
// ======================================================

app.get('/api/emergency/:token', async (req, res) => {
  try {
    const token = req.params.token

    const result = await pool.query(
      `
      SELECT
        full_name,
        blood_type,
        allergies,
        emergency_contact,
        preferred_language,
        emergency_notes,

        show_full_name,
        show_blood_type,
        show_allergies,
        show_emergency_contact,
        show_preferred_language,
        show_emergency_notes

      FROM profiles

      WHERE public_token = $1
      `,
      [token]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Emergency profile not found'
      })
    }

    const profile = result.rows[0]

    const publicProfile = {}

    if (profile.show_full_name) {
      publicProfile.fullName = profile.full_name
    }

    if (profile.show_blood_type) {
      publicProfile.bloodType = profile.blood_type
    }

    if (profile.show_allergies) {
      publicProfile.allergies = profile.allergies
    }

    if (profile.show_emergency_contact) {
      publicProfile.emergencyContact =
        profile.emergency_contact
    }

    if (profile.show_preferred_language) {
      publicProfile.preferredLanguage =
        profile.preferred_language
    }

    if (profile.show_emergency_notes) {
      publicProfile.emergencyNotes =
        profile.emergency_notes
    }

    res.json(publicProfile)

  } catch (error) {
    console.error('Emergency profile error:', error)

    res.status(500).json({
      message: 'Error loading emergency profile'
    })
  }
})


// ======================================================
// REGISTER USER
// ======================================================

app.post('/api/auth/register', async (req, res) => {
  try {
    const {
      fullName,
      email,
      password
    } = req.body

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: 'Full name, email and password are required'
      })
    }

    const existingUser = await pool.query(
      `
      SELECT id
      FROM users
      WHERE email = $1
      `,
      [email]
    )

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: 'User already exists'
      })
    }

    const passwordHash = await bcrypt.hash(
      password,
      10
    )

    const result = await pool.query(
      `
      INSERT INTO users (
        full_name,
        email,
        password_hash
      )

      VALUES ($1, $2, $3)

      RETURNING
        id,
        full_name AS "fullName",
        email,
        created_at AS "createdAt"
      `,
      [
        fullName,
        email,
        passwordHash
      ]
    )

    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0]
    })

  } catch (error) {
    console.error('Register error:', error)

    res.status(500).json({
      message: 'Registration failed'
    })
  }
})


// ======================================================
// LOGIN USER
// ======================================================

app.post('/api/auth/login', async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      })
    }

    const result = await pool.query(
      `
      SELECT
        id,
        full_name,
        email,
        password_hash

      FROM users

      WHERE email = $1
      `,
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const user = result.rows[0]

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    )

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h'
      }
    )

    res.json({
      message: 'Login successful',

      token,

      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email
      }
    })

  } catch (error) {
    console.error('Login error:', error)

    res.status(500).json({
      message: 'Login failed'
    })
  }
})


// ======================================================
// START SERVER
// ======================================================

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Emergify server running on port ${PORT}`)
})