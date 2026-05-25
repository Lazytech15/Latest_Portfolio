import nfcScanner from '../../../public/project/nfcscanner.jpg'

const NFCAttendanceSystem = {
  number: '001',
  category: 'IoT + Web',
  title: 'NFC Attendance System',
  status: 'Shipped',
  year: '2025',
  role: 'Solo Engineer',
  image: nfcScanner,

  description:
    'ESP32 NFC scanner with AES-encrypted tap-to-verify, offline SD card buffering, and real-time server sync.',

  overview: [
    'An employee attendance system built around an ESP32 microcontroller with an NFC/RFID reader. When an employee taps their NFC card, the device reads and decrypts the card payload using AES-256, then sends an encrypted attendance request to the server over HTTPS.',
    'The server verifies the employee record, then responds with an encrypted confirmation packet. The device decrypts the response, extracts the employee name and timestamp, and logs the entry locally — displaying confirmation on an OLED screen.',
    'Offline-first by design: when no internet connection is available, attendance records are serialised to JSON and written to a microSD card. Once connectivity is restored, the device automatically flushes buffered records to the REST API, which processes and persists them to MySQL. A React Vite dashboard shows live attendance feeds via WebSocket with per-department filtering and daily export.',
  ],

  highlights: [
    'AES-256 encrypted card read + server response',
    'Offline buffering to SD card as JSON',
    'Auto-sync when connectivity is restored',
    'Real-time dashboard via WebSocket',
    'LCD confirmation display on device',
    'Per-department filtering & CSV export',
  ],

  tech: ['ESP32', 'NFC/RFID', 'AES-256', 'SD Card', 'MQTT', 'WebSocket', 'React Vite', 'Node.js', 'MySQL'],

  links: {
    github: 'https://github.com/Lazytech15/IOT_ESP32S3WROOM1_JJC_ATTENDANCE'
  },
}

export default NFCAttendanceSystem