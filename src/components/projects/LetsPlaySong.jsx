import letsplaysong from '../../../public/project/letsplaysong/letsplaysong.png'
import letsplaysong2 from '../../../public/project/letsplaysong/letsplaysong2.png'
import letsplaysong3 from '../../../public/project/letsplaysong/letsplaysong3.png'

const LetsPlaySong = {
  number: '007',
  category: 'Mobile',
  title: "Let's Play Song",
  status: 'Shipped',
  year: '2026',
  role: 'Mobile Developer',
  images: [letsplaysong, letsplaysong2, letsplaysong3],

  description:
    'Cross-platform React Native music player streaming songs from Cloudinary, with per-account playlists synced live via Firestore.',

  overview: [
    "Let's Play Song is a cross-platform (iOS + Android) music player built with Expo and React Native, streaming audio hosted on Cloudinary. It shares its song catalogue with a companion web app through a single Firestore project, so any track published from the web uploader shows up in the mobile app in real time.",
    'Users sign in with email/password or Google, and every playlist is stored per-account in Firestore so it stays in sync across devices. The player itself is built on react-native-track-player for reliable background playback, with a mini player docked above the tab bar and a full-screen "Now Playing" view.',
    'Beyond core playback, the app includes a custom equalizer, offline downloads for listening without a connection, and an in-app upload flow for adding new songs directly to the shared Cloudinary/Firestore catalogue.',
  ],

  highlights: [
    'Cross-platform playback via react-native-track-player with background audio, seek, shuffle, and repeat modes',
    'Email/password and Google Sign-In backed by Firebase Authentication',
    'Playlists synced per-account in real time through Firestore',
    'Shared song catalogue with a companion web app via a single Firebase project',
    'Custom multi-band equalizer',
    'Offline downloads for songs, playable without a connection',
    'Cloudinary-backed streaming with optional bitrate transformation for lower data usage',
    'In-app song upload flow',
    'Mini player docked above the tab bar plus a full-screen "Now Playing" modal',
  ],

  tech: [
    'React Native',
    'Expo',
    'expo-router',
    'react-native-track-player',
    'Firebase Authentication',
    'Firestore',
    'Cloudinary',
    'expo-auth-session',
    'TypeScript',
  ],

  links: {
    github: 'https://github.com/Lazytech15/lets_play_song',
    apk: 'https://drive.google.com/file/d/1h98wRt71iKbUkuOkn_4lbIhjG0fEo2nB/view?usp=sharing',
  },
}

export default LetsPlaySong
