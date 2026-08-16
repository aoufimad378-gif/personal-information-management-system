function PublicEmergency() {
  const params = new URLSearchParams(window.location.search)

  const fullName = params.get('name')
  const bloodType = params.get('bloodType')
  const allergies = params.get('allergies')
  const emergencyContact = params.get('contact')

  return (
    <div className="public-emergency-page">
      <div className="public-emergency-container">

        <div className="public-emergency-header">
          <div className="emergency-symbol">+</div>

          <div>
            <span>EMERGENCY INFORMATION</span>
            <h1>Emergency Profile</h1>
            <p>
              Critical information for medical personnel.
            </p>
          </div>
        </div>


        <div className="public-person-card">

          <div className="public-person-header">

            <div className="public-avatar">
              {fullName
                ? fullName.charAt(0).toUpperCase()
                : '?'}
            </div>

            <div>
              <span>Patient</span>
              <h2>{fullName || 'Unknown'}</h2>
            </div>

          </div>


          <div className="public-information-grid">

            <div className="public-info-card blood-card">
              <span>Blood Type</span>
              <strong>
                {bloodType || 'Not provided'}
              </strong>
            </div>


            <div className="public-info-card">
              <span>Allergies</span>
              <strong>
                {allergies || 'None reported'}
              </strong>
            </div>


            <div className="public-info-card emergency-contact-card">
              <span>Emergency Contact</span>
              <strong>
                {emergencyContact || 'Not provided'}
              </strong>
            </div>

          </div>


          {emergencyContact && (
            <a
              href={`tel:${emergencyContact}`}
              className="emergency-call-btn"
            >
              Call Emergency Contact
            </a>
          )}

        </div>


        <div className="public-privacy-note">
          <strong>Emergency Access Only</strong>

          <p>
            Only emergency information approved by the
            profile owner is displayed.
          </p>
        </div>

      </div>
    </div>
  )
}

export default PublicEmergency