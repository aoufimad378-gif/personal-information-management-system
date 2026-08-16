import { useState } from 'react'
import './App.css'

import Dashboard from './pages/Dashboard'
import Profiles from './pages/Profiles'
import Emergency from './pages/Emergency'
import QRCodePage from './pages/QRCodePage'
import PublicEmergency from './pages/PublicEmergency'


function App() {

  // =========================
  // STATES
  // =========================

  const [showForm, setShowForm] = useState(false)
  const [profiles, setProfiles] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedProfileId, setSelectedProfileId] = useState('')

  const [emergencyVisibility, setEmergencyVisibility] = useState({
    fullName: true,
    bloodType: true,
    allergies: true,
    emergencyContact: true,
    preferredLanguage: true,
    emergencyNotes: true
  })

  const [formData, setFormData] = useState({
    fullName: '',
    tcNumber: '',
    phone: '',
    email: '',
    bloodType: '',
    preferredLanguage: '',
    allergies: '',
    emergencyContact: '',
    emergencyNotes: ''
  })


  // =========================
  // FORM CHANGE
  // =========================

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }


  // =========================
  // RESET FORM
  // =========================

  function resetForm() {
    setFormData({
      fullName: '',
      tcNumber: '',
      phone: '',
      email: '',
      bloodType: '',
      preferredLanguage: '',
      allergies: '',
      emergencyContact: '',
      emergencyNotes: ''
    })

    setEditingId(null)
  }


  // =========================
  // CREATE / UPDATE PROFILE
  // =========================

  function handleSubmit(event) {
    event.preventDefault()

    if (editingId !== null) {

      setProfiles((currentProfiles) =>
        currentProfiles.map((profile) =>
          profile.id === editingId
            ? { ...profile, ...formData }
            : profile
        )
      )

    } else {

      const newProfile = {
        id: Date.now(),
        ...formData
      }

      setProfiles((currentProfiles) => [
        ...currentProfiles,
        newProfile
      ])
    }

    resetForm()
    setShowForm(false)
  }


  // =========================
  // DELETE PROFILE
  // =========================

  function handleDelete(id) {
    setProfiles((currentProfiles) =>
      currentProfiles.filter(
        (profile) => profile.id !== id
      )
    )
  }


  // =========================
  // EDIT PROFILE
  // =========================

  function handleEdit(profile) {
    setFormData({
      fullName: profile.fullName,
      tcNumber: profile.tcNumber,
      phone: profile.phone,
      email: profile.email,
      bloodType: profile.bloodType,
      preferredLanguage: profile.preferredLanguage,
      allergies: profile.allergies,
      emergencyContact: profile.emergencyContact,
      emergencyNotes: profile.emergencyNotes
    })

    setEditingId(profile.id)
    setShowForm(true)
  }


  // =========================
  // CLOSE FORM
  // =========================

  function handleCloseForm() {
    resetForm()
    setShowForm(false)
  }


  // =========================
  // ADD PROFILE
  // =========================

  function handleAddProfile() {
    resetForm()
    setShowForm(true)
  }


  // =========================
  // SEARCH
  // =========================

  const filteredProfiles = profiles.filter((profile) =>
    profile.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )


  // =========================
  // PUBLIC EMERGENCY PAGE
  // =========================

  if (window.location.pathname.startsWith('/emergency')) {
    return <PublicEmergency />
  }


  // =========================
  // NORMAL APPLICATION
  // =========================

  return (
    <div className="app-layout">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <div className="sidebar-brand">

          <div className="brand-icon">
            +
          </div>

          <div>
            <h2>Emergify</h2>
            <p>Emergency Profiles</p>
          </div>

        </div>


        <nav className="sidebar-nav">

          <button
            type="button"
            className={`nav-item ${
              activePage === 'dashboard' ? 'active' : ''
            }`}
            onClick={() => setActivePage('dashboard')}
          >
            Dashboard
          </button>


          <button
            type="button"
            className={`nav-item ${
              activePage === 'profiles' ? 'active' : ''
            }`}
            onClick={() => setActivePage('profiles')}
          >
            My Profiles
          </button>


          <button
            type="button"
            className={`nav-item ${
              activePage === 'emergency' ? 'active' : ''
            }`}
            onClick={() => setActivePage('emergency')}
          >
            Emergency
          </button>


          <button
            type="button"
            className={`nav-item ${
              activePage === 'qr' ? 'active' : ''
            }`}
            onClick={() => setActivePage('qr')}
          >
            QR Codes
          </button>

        </nav>


        <div className="sidebar-bottom">

          <button
            type="button"
            className="nav-item"
          >
            Settings
          </button>

          <button
            type="button"
            className="nav-item"
          >
            Help
          </button>

        </div>

      </aside>


      {/* =========================
          MAIN AREA
      ========================= */}

      <div className="main-area">


        {/* TOPBAR */}

        <header className="topbar">

          <div>

            <p className="topbar-label">
              Personal & Emergency Information
            </p>

            <h1>Welcome back</h1>

          </div>


          <div className="topbar-actions">

            <button
              type="button"
              className="notification-btn"
            >
              🔔
            </button>

            <div className="user-avatar">
              B
            </div>

          </div>

        </header>


        {/* =========================
            CONTENT
        ========================= */}

        <main className="dashboard-content">


          {/* QR PAGE */}

          {activePage === 'qr' && (
            <QRCodePage
              profiles={profiles}
              selectedProfileId={selectedProfileId}
              setSelectedProfileId={setSelectedProfileId}
              emergencyVisibility={emergencyVisibility}
            />
          )}


          {/* EMERGENCY SETTINGS */}

          {activePage === 'emergency' && (
            <Emergency
              profiles={profiles}
              selectedProfileId={selectedProfileId}
              setSelectedProfileId={setSelectedProfileId}
              emergencyVisibility={emergencyVisibility}
              setEmergencyVisibility={setEmergencyVisibility}
            />
          )}


          {/* PROFILES PAGE */}

          {activePage === 'profiles' && (
            <Profiles
              profiles={profiles}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onAddProfile={handleAddProfile}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}


          {/* DASHBOARD */}

          {activePage === 'dashboard' && (
            <>
              <Dashboard
                profiles={profiles}
                onAddProfile={handleAddProfile}
              />


              <section className="dashboard-grid">

                <div className="profiles-panel">

                  <div className="panel-header">

                    <div>

                      <p className="section-label">
                        MY PROFILES
                      </p>

                      <h2>
                        Personal Profiles
                      </h2>

                    </div>


                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search profiles..."
                      value={searchTerm}
                      onChange={(event) =>
                        setSearchTerm(event.target.value)
                      }
                    />

                  </div>


                  {profiles.length === 0 ? (

                    <div className="empty-state">

                      <div className="empty-icon">
                        +
                      </div>

                      <h3>
                        No profiles yet
                      </h3>

                      <p>
                        Create your first emergency profile
                        to get started.
                      </p>

                      <button
                        type="button"
                        className="create-btn"
                        onClick={handleAddProfile}
                      >
                        Create Profile
                      </button>

                    </div>

                  ) : (

                    <div className="profiles-list">

                      {filteredProfiles.map((profile) => (

                        <div
                          className="profile-card"
                          key={profile.id}
                        >

                          <div className="profile-main">

                            <div className="profile-avatar">
                              {profile.fullName
                                ? profile.fullName
                                    .charAt(0)
                                    .toUpperCase()
                                : '?'}
                            </div>

                            <div>
                              <h3>
                                {profile.fullName}
                              </h3>

                              <p>
                                {profile.email}
                              </p>
                            </div>

                          </div>


                          <div className="profile-info-row">

                            <div>

                              <span>
                                Blood Type
                              </span>

                              <strong>
                                {profile.bloodType || 'N/A'}
                              </strong>

                            </div>


                            <div>

                              <span>
                                Status
                              </span>

                              <strong className="status-ready">
                                Emergency Ready
                              </strong>

                            </div>

                          </div>


                          <div className="profile-actions">

                            <button
                              type="button"
                              className="edit-btn"
                              onClick={() =>
                                handleEdit(profile)
                              }
                            >
                              Edit
                            </button>


                            <button
                              type="button"
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(profile.id)
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </div>

                      ))}

                    </div>

                  )}

                </div>


                {/* RIGHT COLUMN */}

                <div className="right-column">


                  <div className="emergency-card">

                    <div className="card-icon emergency-icon">
                      !
                    </div>

                    <p className="section-label">
                      EMERGENCY ACCESS
                    </p>

                    <h3>
                      Emergency Contact
                    </h3>

                    <p>
                      Keep critical contact information ready
                      when it is needed.
                    </p>

                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() =>
                        setActivePage('emergency')
                      }
                    >
                      Manage Emergency Info
                    </button>

                  </div>


                  <div className="qr-card">

                    <div className="qr-placeholder">

                      <div className="fake-qr">
                        ▦
                      </div>

                    </div>

                    <p className="section-label">
                      QR ACCESS
                    </p>

                    <h3>
                      Emergency QR Code
                    </h3>

                    <p>
                      Generate a scannable emergency profile
                      for mobile access.
                    </p>

                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() =>
                        setActivePage('qr')
                      }
                    >
                      Generate QR
                    </button>

                  </div>

                </div>

              </section>
            </>
          )}

        </main>


        {/* =========================
            CREATE / EDIT MODAL
        ========================= */}

        {showForm && (

          <div className="modal-overlay">

            <section className="profile-modal">


              <div className="form-header">

                <div>

                  <p className="section-label">
                    PROFILE MANAGEMENT
                  </p>

                  <h2>
                    {editingId !== null
                      ? 'Edit Emergency Profile'
                      : 'Create Emergency Profile'}
                  </h2>

                  <p>
                    Enter personal and emergency information.
                  </p>

                </div>


                <button
                  type="button"
                  className="close-btn"
                  onClick={handleCloseForm}
                >
                  ✕
                </button>

              </div>


              <form
                className="profile-form"
                onSubmit={handleSubmit}
              >

                <h3>
                  Personal Information
                </h3>


                <div className="form-grid">


                  <div className="form-group">

                    <label>
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      required
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      TC Number
                    </label>

                    <input
                      type="text"
                      name="tcNumber"
                      value={formData.tcNumber}
                      onChange={handleChange}
                      placeholder="Enter 11-digit TC number"
                      maxLength="11"
                      pattern="[0-9]{11}"
                      title="TC number must contain exactly 11 digits"
                      required
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                    />

                  </div>

                </div>


                <h3>
                  Emergency Information
                </h3>


                <div className="form-grid">


                  <div className="form-group">

                    <label>
                      Blood Type
                    </label>

                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select blood type
                      </option>

                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Preferred Language
                    </label>

                    <input
                      type="text"
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleChange}
                      placeholder="Example: English"
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Allergies
                    </label>

                    <input
                      type="text"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      placeholder="Enter allergies"
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Emergency Contact
                    </label>

                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      placeholder="Enter emergency contact"
                      required
                    />

                  </div>

                </div>


                <div className="form-group">

                  <label>
                    Emergency Notes
                  </label>

                  <textarea
                    name="emergencyNotes"
                    value={formData.emergencyNotes}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Important emergency information..."
                  />

                </div>


                <div className="form-actions">

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCloseForm}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="save-btn"
                  >
                    {editingId !== null
                      ? 'Update Profile'
                      : 'Create Profile'}
                  </button>

                </div>

              </form>

            </section>

          </div>

        )}

      </div>

    </div>
  )
}

export default App