import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'LiftLab.com',
  appName: 'LiftLab',
  webDir: 'dist/lift-lab/browser',
  server: {
    url: 'http://192.168.1.2:4200',
    cleartext: true,
    androidScheme: 'https',
  },
};

export default config;
