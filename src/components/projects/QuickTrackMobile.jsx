const QuickTrackMobile = {
  number: '004',
  category: 'Mobile',
  title: 'QuickTrack Mobile',
  status: 'Shipped',
  year: '2024',
  role: 'Mobile Developer',
  image: null,

  description:
    'Cross-platform React Native app for field technicians to log and sync equipment status.',

  overview: [
    'Built for field technicians who need to work with or without internet. The app allows logging equipment status, capturing photos, recording notes, and generating PDF reports on-device.',
    'Data syncs to a REST API when connectivity is restored. Push notifications alert technicians to overdue equipment checks.',
    'The offline-first architecture uses a local SQLite queue that batches sync operations, reducing data loss risk in low-signal environments.',
  ],

  highlights: [
    'Offline-first with local SQLite queue',
    'Camera integration for on-site photo capture',
    'On-device PDF report generation',
    'Push notifications for overdue checks',
    'Automatic REST API sync on reconnect',
    'iOS and Android via Expo',
  ],

  tech: ['React Native', 'Expo', 'AsyncStorage', 'SQLite', 'REST API', 'PDF Generation'],

  links: {
    github: 'https://github.com',
    live: null,
  },
}

export default QuickTrackMobile