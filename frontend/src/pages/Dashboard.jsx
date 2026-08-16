function Dashboard({ profiles, onAddProfile }) {
  return (
    <div>
      <section className="hero-card">
        <div className="hero-text">
          <span className="hero-tag">
            Emergency information, when it matters.
          </span>

          <h2>
            Keep your essential information secure and accessible.
          </h2>

          <p>
            Create emergency profiles, control what information is shared,
            and generate QR codes for fast emergency access.
          </p>

          <button
            type="button"
            className="hero-button"
            onClick={onAddProfile}
          >
            + Create Profile
          </button>
        </div>

        <div className="hero-visual">
          <div className="medical-circle">+</div>
        </div>
      </section>

      <section className="overview-section">
        <div className="section-title-row">
          <div>
            <p className="section-label">OVERVIEW</p>
            <h2>Emergency Dashboard</h2>
          </div>
        </div>

        <div className="overview-grid">
          <div className="overview-card">
            <span>Total Profiles</span>
            <h3>{profiles.length}</h3>
            <p>Registered personal profiles</p>
          </div>

          <div className="overview-card">
            <span>Emergency Ready</span>
            <h3>{profiles.length}</h3>
            <p>Profiles with emergency information</p>
          </div>

          <div className="overview-card">
            <span>QR Codes</span>
            <h3>0</h3>
            <p>Emergency QR codes generated</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard