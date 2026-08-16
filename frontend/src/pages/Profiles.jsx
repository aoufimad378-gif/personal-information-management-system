function Profiles({
  profiles,
  filteredProfiles,
  searchTerm,
  setSearchTerm,
  onAddProfile,
  onEdit,
  onDelete
}) {
  return (
    <div className="profiles-page">

      <div className="page-heading">
        <div>
          <p className="section-label">PROFILE MANAGEMENT</p>
          <h1>My Profiles</h1>
          <p>
            Create, search and manage your personal emergency profiles.
          </p>
        </div>

        <button
          type="button"
          className="create-btn"
          onClick={onAddProfile}
        >
          + Add Profile
        </button>
      </div>

      <div className="profiles-toolbar">

        <input
          type="text"
          className="search-input"
          placeholder="Search profiles..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />

        <div className="profile-count">
          {profiles.length} Profiles
        </div>

      </div>

      {profiles.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">+</div>

          <h3>No profiles yet</h3>

          <p>
            Create your first emergency profile to get started.
          </p>

          <button
            type="button"
            className="create-btn"
            onClick={onAddProfile}
          >
            Create Profile
          </button>

        </div>

      ) : filteredProfiles.length === 0 ? (

        <div className="empty-state">
          <h3>No profiles found</h3>

          <p>
            No profile matches "{searchTerm}".
          </p>
        </div>

      ) : (

        <div className="profiles-page-grid">

          {filteredProfiles.map((profile) => (

            <div
              className="profile-card"
              key={profile.id}
            >

              <div className="profile-main">

                <div className="profile-avatar">
                  {profile.fullName
                    ? profile.fullName.charAt(0).toUpperCase()
                    : '?'}
                </div>

                <div>
                  <h3>{profile.fullName}</h3>
                  <p>{profile.email}</p>
                </div>

              </div>

              <div className="profile-details">

                <div>
                  <span>Blood Type</span>
                  <strong>
                    {profile.bloodType || 'N/A'}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    {profile.phone || 'N/A'}
                  </strong>
                </div>

                <div>
                  <span>Language</span>
                  <strong>
                    {profile.preferredLanguage || 'N/A'}
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong className="status-ready">
                    Emergency Ready
                  </strong>
                </div>

              </div>

              <div className="profile-actions">

                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => onEdit(profile)}
                >
                  Edit Profile
                </button>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => onDelete(profile.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default Profiles