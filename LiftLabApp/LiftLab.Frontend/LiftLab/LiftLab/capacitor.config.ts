import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'LiftLab.com',
  appName: 'LiftLab',
  webDir: 'dist/lift-lab/browser',
  server: {
    androidScheme: 'http',
  },
};

export default config;
