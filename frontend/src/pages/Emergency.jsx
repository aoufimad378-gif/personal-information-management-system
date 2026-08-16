function Emergency({
  profiles,
  selectedProfileId,
  setSelectedProfileId,
  emergencyVisibility,
  setEmergencyVisibility
}) {
  const selectedProfile = profiles.find(
    (profile) => profile.id === Number(selectedProfileId)
  )

  function handleVisibilityChange(event) {
    const { name, checked } = event.target

    setEmergencyVisibility({
      ...emergencyVisibility,
      [name]: checked
    })
  }

  return (
    <div className="emergency-page">

      <div className="page-heading">
        <div>
          <p className="section-label">
            EMERGENCY ACCESS
          </p>

          <h1>
            Emergency Information
          </h1>

          <p>
            Choose which information can be shown when
            someone scans the emergency QR code.
          </p>
        </div>
      </div>


      {profiles.length === 0 ? (

        <div className="empty-state">
          <div className="empty-icon">
            !
          </div>

          <h3>
            No profiles available
          </h3>

          <p>
            Create a profile first before configuring
            emergency access.
          </p>
        </div>

      ) : (

        <div className="emergency-layout">


          {/* PROFILE SELECTOR */}

          <section className="emergency-settings-card">

            <p className="section-label">
              PROFILE
            </p>

            <h2>
              Select Emergency Profile
            </h2>

            <p className="settings-description">
              Select the profile whose emergency information
              you want to configure.
            </p>

            <select
              className="profile-select"
              value={selectedProfileId}
              onChange={(event) =>
                setSelectedProfileId(event.target.value)
              }
            >
              <option value="">
                Select a profile
              </option>

              {profiles.map((profile) => (
                <option
                  key={profile.id}
                  value={profile.id}
                >
                  {profile.fullName}
                </option>
              ))}
            </select>


            {selectedProfile && (
              <div className="selected-profile-summary">

                <div className="profile-avatar">
                  {selectedProfile.fullName
                    ? selectedProfile.fullName
                        .charAt(0)
                        .toUpperCase()
                    : '?'}
                </div>

                <div>
                  <h3>
                    {selectedProfile.fullName}
                  </h3>

                  <p>
                    {selectedProfile.email}
                  </p>
                </div>

              </div>
            )}

          </section>


          {/* PRIVACY SETTINGS */}

          <section className="emergency-settings-card">

            <p className="section-label">
              PRIVACY CONTROLS
            </p>

            <h2>
              Information Visible in an Emergency
            </h2>

            <p className="settings-description">
              Only selected information will be available
              through the emergency QR page.
            </p>


            <div className="privacy-options">


              <label className="privacy-option">

                <div>
                  <strong>
                    Full Name
                  </strong>

                  <span>
                    Show the person's name
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="fullName"
                  checked={emergencyVisibility.fullName}
                  onChange={handleVisibilityChange}
                />

              </label>


              <label className="privacy-option">

                <div>
                  <strong>
                    Blood Type
                  </strong>

                  <span>
                    Make blood type available quickly
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="bloodType"
                  checked={emergencyVisibility.bloodType}
                  onChange={handleVisibilityChange}
                />

              </label>


              <label className="privacy-option">

                <div>
                  <strong>
                    Allergies
                  </strong>

                  <span>
                    Show known allergies
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="allergies"
                  checked={emergencyVisibility.allergies}
                  onChange={handleVisibilityChange}
                />

              </label>


              <label className="privacy-option">

                <div>
                  <strong>
                    Emergency Contact
                  </strong>

                  <span>
                    Allow access to emergency contact
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="emergencyContact"
                  checked={
                    emergencyVisibility.emergencyContact
                  }
                  onChange={handleVisibilityChange}
                />

              </label>


              <label className="privacy-option">

                <div>
                  <strong>
                    Preferred Language
                  </strong>

                  <span>
                    Show preferred communication language
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="preferredLanguage"
                  checked={
                    emergencyVisibility.preferredLanguage
                  }
                  onChange={handleVisibilityChange}
                />

              </label>


              <label className="privacy-option">

                <div>
                  <strong>
                    Emergency Notes
                  </strong>

                  <span>
                    Show important emergency notes
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="emergencyNotes"
                  checked={
                    emergencyVisibility.emergencyNotes
                  }
                  onChange={handleVisibilityChange}
                />

              </label>

            </div>

          </section>


          {/* PREVIEW */}

          <section className="emergency-preview-card">

            <p className="section-label">
              PREVIEW
            </p>

            <h2>
              Public Emergency Profile
            </h2>

            {!selectedProfile ? (

              <div className="preview-empty">
                Select a profile to preview emergency access.
              </div>

            ) : (

              <div className="public-profile-preview">

                <div className="preview-alert">
                  Emergency Information
                </div>


                {emergencyVisibility.fullName && (
                  <div className="preview-name">
                    <div className="profile-avatar">
                      {selectedProfile.fullName
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <h3>
                      {selectedProfile.fullName}
                    </h3>
                  </div>
                )}


                <div className="preview-information">

                  {emergencyVisibility.bloodType && (
                    <div>
                      <span>
                        Blood Type
                      </span>

                      <strong>
                        {selectedProfile.bloodType || 'N/A'}
                      </strong>
                    </div>
                  )}


                  {emergencyVisibility.allergies && (
                    <div>
                      <span>
                        Allergies
                      </span>

                      <strong>
                        {selectedProfile.allergies || 'None'}
                      </strong>
                    </div>
                  )}


                  {emergencyVisibility.preferredLanguage && (
                    <div>
                      <span>
                        Preferred Language
                      </span>

                      <strong>
                        {selectedProfile.preferredLanguage
                          || 'N/A'}
                      </strong>
                    </div>
                  )}


                  {emergencyVisibility.emergencyContact && (
                    <div>
                      <span>
                        Emergency Contact
                      </span>

                      <strong>
                        {selectedProfile.emergencyContact
                          || 'N/A'}
                      </strong>
                    </div>
                  )}


                  {emergencyVisibility.emergencyNotes && (
                    <div className="preview-notes">
                      <span>
                        Emergency Notes
                      </span>

                      <strong>
                        {selectedProfile.emergencyNotes
                          || 'No notes provided'}
                      </strong>
                    </div>
                  )}

                </div>

              </div>
            )}

          </section>

        </div>
      )}

    </div>
  )
}

export default Emergency