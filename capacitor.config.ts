import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Phone-A',
  webDir: 'www',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true
  },
  server: {
    cleartext: true
  }
};

export default config;
