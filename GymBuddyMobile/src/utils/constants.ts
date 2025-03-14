export const WORKOUT_TYPES = [
  'squats',
  'lunges',
  'bicep_curls',
  'situps',
  'pushups',
  'tricep_extensions',
  'dumbbell_rows',
  'jumping_jacks',
  'dumbbell_shoulder_press',
  'lateral_shoulder_raises',
];

export const APP_CONFIG = {
  MODEL_PATH: 'gymbuddy_classifier_v3.tflite',
  CAMERA: {
    FRAME_RATE: 30,
    RESOLUTION: '720p',
  },
  AUTH: {
    TOKEN_KEY: '@gymbuddy_auth_token',
    USER_KEY: '@gymbuddy_user',
  },
  API: {
    BASE_URL: 'https://api.gymbuddy.com',
    TIMEOUT: 10000,
  },
};

export const SCREENS = {
  SPLASH: 'Splash',
  LOGIN: 'Login',
  REGISTER: 'Register',
  HOME: 'Home',
  WORKOUT: 'Workout',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  STATS: 'Statistics',
}; 