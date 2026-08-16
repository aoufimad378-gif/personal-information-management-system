import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

function Scanner() {
  const scannerRef = useRef(null)
  const [isScanning, setIsScanning] = useState(false)
  const [message, setMessage] = useState(
    'Press Start Camera to scan an emergency QR code.'
  )

  async function startScanner() {
    try {
      const scanner = new Html5Qrcode('qr-reader')
      scannerRef.current = scanner

      setIsScanning(true)
      setMessage('Point the camera at an emergency QR code.')

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250
          }
        },
        async (decodedText) => {
          setMessage('QR detected. Opening emergency profile...')

          try {
            await scanner.stop()
          } catch {
            // ignore stop error
          }

          setIsScanning(false)

          if (decodedText.includes('/emergency/')) {
            window.location.href = decodedText
          } else {
            setMessage(
              'This QR code is not a valid emergency profile.'
            )
          }
        },
        () => {
          // waiting for QR
        }
      )
    } catch (error) {
      console.error(error)

      setMessage(
        'Camera could not start. Check camera permission.'
      )

      setIsScanning(false)
    }
  }

  async function stopScanner() {
    if (!scannerRef.current) return

    try {
      await scannerRef.current.stop()
      await scannerRef.current.clear()
    } catch (error) {
      console.error(error)
    }

    scannerRef.current = null
    setIsScanning(false)
    setMessage('Scanner stopped.')
  }

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [])

  return (
    <div className="scanner-page">
      <div className="page-heading">
        <div>
          <p className="section-label">
            EMERGENCY SCANNER
          </p>

          <h1>Scan Emergency QR</h1>

          <p>
            Scan an emergency profile QR code using
            the device camera.
          </p>
        </div>
      </div>

      <div className="scanner-layout">
        <section className="scanner-card">
          <div id="qr-reader" />

          <p className="scanner-message">
            {message}
          </p>

          <div className="scanner-actions">
            {!isScanning ? (
              <button
                type="button"
                className="primary-btn"
                onClick={startScanner}
              >
                Start Camera
              </button>
            ) : (
              <button
                type="button"
                className="delete-btn"
                onClick={stopScanner}
              >
                Stop Camera
              </button>
            )}
          </div>
        </section>

        <section className="scanner-info-card">
          <p className="section-label">
            HOW IT WORKS
          </p>

          <h2>Emergency QR Access</h2>

          <div className="scanner-step">
            <strong>1</strong>
            <p>Allow camera access.</p>
          </div>

          <div className="scanner-step">
            <strong>2</strong>
            <p>
              Point the camera at an emergency QR code.
            </p>
          </div>

          <div className="scanner-step">
            <strong>3</strong>
            <p>
              The emergency profile opens automatically.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Scanner