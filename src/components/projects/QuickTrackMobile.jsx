import quicktrack from '../../../public/project/quicktrack/quicktrack.png'
import quicktrack2 from '../../../public/project/quicktrack/quicktrack2.png'
import quicktrack3 from '../../../public/project/quicktrack/quicktrack3.png'

const QuickTrackMobile = {
  number: '004',
  category: 'Mobile',
  title: 'QuickTrack Mobile',
  status: 'Shipped',
  year: '2026',
  role: 'Mobile Developer',
  images: [quicktrack, quicktrack2, quicktrack3],

  description:
    'Offline-first React Native app for field technicians to track, inspect, and report on equipment across iOS and Android.',

  overview: [
    'QuickTrack is built for field technicians who operate in environments with unreliable connectivity. Technicians can register equipment, log inspection results, attach on-site photos, and generate shareable PDF reports — all without an internet connection.',
    'Every write operation is queued in a local SQLite sync table. When connectivity is restored, the app automatically batches and flushes pending records to a configurable REST API, with per-item retry tracking and sync-status indicators throughout the UI.',
    'Push notifications are used in two ways: an immediate alert fires whenever overdue equipment is detected on app load, and a daily 8 AM reminder prompts technicians to review their schedule. Equipment is categorized (HVAC, Electrical, Plumbing, Safety, Mechanical) and each item tracks serial number, location, inspection history, and next-check date.',
  ],

  highlights: [
    'Offline-first SQLite queue with per-record sync tracking and retry logic',
    'Equipment dashboard with live overdue, active, and pending-sync counts',
    'Service log system: technician name, inspection status, timestamped notes, and attached photos',
    'On-device PDF report generation with full service history, exported via native share sheet',
    'Camera and photo library integration for on-site evidence capture',
    'Push notifications for overdue checks and configurable daily reminders',
    'Automatic REST API sync on reconnect with per-item success/failure tracking',
    'Supports HVAC, Electrical, Plumbing, Safety, and Mechanical equipment categories',
    'Cross-platform iOS and Android via Expo',
  ],

  tech: [
    'React Native',
    'Expo',
    'expo-sqlite',
    'expo-router',
    'expo-notifications',
    'expo-print',
    'expo-sharing',
    'expo-image-picker',
    'expo-camera',
    'AsyncStorage',
    'REST API',
    'React Navigation',
    'date-fns',
  ],

  links: {
    github: 'https://github.com/Lazytech15/quicktrack_mobile'
  },
}

export default QuickTrackMobile