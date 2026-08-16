import { QRCodeSVG } from 'qrcode.react'


function QRCodePage({
  profiles,
  selectedProfileId,
  setSelectedProfileId,
  emergencyVisibility
}) {

  const selectedProfile = profiles.find(
    (profile) =>
      profile.id === Number(selectedProfileId)
  )


  // =========================
  // BUILD PUBLIC EMERGENCY URL
  // =========================

  function buildEmergencyUrl() {

    if (!selectedProfile) {
      return ''
    }

    const params = new URLSearchParams()


    if (emergencyVisibility.fullName) {
      params.set(
        'name',
        selectedProfile.fullName || ''
      )
    }


    if (emergencyVisibility.bloodType) {
      params.set(
        'bloodType',
        selectedProfile.bloodType || ''
      )
    }


    if (emergencyVisibility.allergies) {
      params.set(
        'allergies',
        selectedProfile.allergies || ''
      )
    }


    if (emergencyVisibility.emergencyContact) {
      params.set(
        'contact',
        selectedProfile.emergencyContact || ''
      )
    }


    if (emergencyVisibility.preferredLanguage) {
      params.set(
        'language',
        selectedProfile.preferredLanguage || ''
      )
    }


    if (emergencyVisibility.emergencyNotes) {
      params.set(
        'notes',
        selectedProfile.emergencyNotes || ''
      )
    }


    return (
      `http://192.168.0.145:5174/emergency?${params.toString()}`
    )
  }


  const qrValue = buildEmergencyUrl()


  // =========================
  // DOWNLOAD QR
  // =========================

  function handleDownloadQR() {

    const svg =
      document.getElementById('emergency-qr')

    if (!svg || !selectedProfile) {
      return
    }


    const svgData =
      new XMLSerializer().serializeToString(svg)


    const blob = new Blob(
      [svgData],
      {
        type: 'image/svg+xml;charset=utf-8'
      }
    )


    const url =
      URL.createObjectURL(blob)


    const link =
      document.createElement('a')


    link.href = url

    link.download =
      `${selectedProfile.fullName}-emergency-qr.svg`


    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }


  // =========================
  // COPY LINK
  // =========================

  function handleCopyLink() {

    if (!qrValue) {
      return
    }

    navigator.clipboard.writeText(qrValue)
  }


  // =========================
  // PAGE
  // =========================

  return (
    <div className="qr-page">


      <div className="page-heading">

        <div>

          <p className="section-label">
            QR ACCESS
          </p>

          <h1>
            Emergency QR Codes
          </h1>

          <p>
            Generate a QR code that gives emergency
            personnel access only to approved information.
          </p>

        </div>

      </div>


      {profiles.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            ▦
          </div>

          <h3>
            No profiles available
          </h3>

          <p>
            Create an emergency profile before
            generating a QR code.
          </p>

        </div>

      ) : (

        <div className="qr-page-layout">


          {/* =========================
              PROFILE
          ========================= */}

          <section className="qr-settings-card">

            <p className="section-label">
              PROFILE
            </p>

            <h2>
              Select a Profile
            </h2>

            <p className="settings-description">
              Choose the profile that this emergency
              QR code belongs to.
            </p>


            <select
              className="profile-select"
              value={selectedProfileId}
              onChange={(event) =>
                setSelectedProfileId(
                  event.target.value
                )
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
                    Emergency QR profile
                  </p>

                </div>

              </div>

            )}


            {selectedProfile && (

              <div className="qr-sharing-info">

                <p className="section-label">
                  SHARED INFORMATION
                </p>


                {emergencyVisibility.fullName && (
                  <p>✓ Full Name</p>
                )}

                {emergencyVisibility.bloodType && (
                  <p>✓ Blood Type</p>
                )}

                {emergencyVisibility.allergies && (
                  <p>✓ Allergies</p>
                )}

                {emergencyVisibility.emergencyContact && (
                  <p>✓ Emergency Contact</p>
                )}

                {emergencyVisibility.preferredLanguage && (
                  <p>✓ Preferred Language</p>
                )}

                {emergencyVisibility.emergencyNotes && (
                  <p>✓ Emergency Notes</p>
                )}

              </div>

            )}

          </section>


          {/* =========================
              QR CODE
          ========================= */}

          <section className="generated-qr-card">

            <p className="section-label">
              GENERATED QR
            </p>

            <h2>
              Emergency QR Code
            </h2>


            {!selectedProfile ? (

              <div className="qr-empty">

                Select a profile to generate
                its emergency QR code.

              </div>

            ) : (

              <div className="generated-qr-content">


                <div className="real-qr-wrapper">

                  <QRCodeSVG
                    id="emergency-qr"
                    value={qrValue}
                    size={200}
                    level="H"
                  />

                </div>


                <h3>
                  {selectedProfile.fullName}
                </h3>


                <p className="qr-description">
                  A doctor, nurse, or emergency responder
                  can scan this QR code using a phone camera
                  to view the approved emergency information.
                </p>


                <div className="qr-url-box">
                  {qrValue}
                </div>


                <button
                  type="button"
                  className="primary-btn"
                  onClick={handleCopyLink}
                >
                  Copy Emergency Link
                </button>


                <button
                  type="button"
                  className="secondary-btn"
                  onClick={handleDownloadQR}
                >
                  Download QR
                </button>

              </div>

            )}

          </section>

        </div>

      )}

    </div>
  )
}


export default QRCodePage