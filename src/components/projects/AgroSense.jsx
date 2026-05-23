const AgroSense = {
  number: '006',
  category: 'IoT + Web',
  title: 'AgroSense',
  status: 'In Progress',
  year: '2025',
  role: 'IoT + Full Stack Developer',
  image: null,

  description:
    'Smart agriculture monitoring with ESP32 soil sensors and a React dashboard.',

  overview: [
    'A smart farming system using ESP32-based sensor arrays to monitor soil moisture, pH, and NPK levels across multiple field nodes. Farmers access real-time data from a React dashboard and can configure automated irrigation triggers.',
    'An n8n automation pipeline sends SMS alerts when soil conditions fall below thresholds.',
    'The system supports up to 32 distributed sensor nodes per field, all communicating via MQTT to a central broker, with 7-day historical charting and precipitation overlay.',
  ],

  highlights: [
    'ESP32 soil moisture, pH & NPK sensor array',
    'Automated irrigation trigger configuration',
    'SMS alerts via n8n when thresholds breached',
    'Up to 32 distributed nodes per field',
    'MQTT broker for real-time telemetry',
    '7-day historical charts with precipitation overlay',
  ],

  tech: ['ESP32', 'Sensors', 'React Vite', 'MQTT', 'Node.js', 'MySQL', 'n8n'],

  links: {
    github: 'https://github.com',
    live: null,
  },
}

export default AgroSense