export interface Feedback {
    topic:string;
    subject: string;
    message: string;
    deviceName: string;
    fileType: string;
    attachment: string;
    deviceNumber: string;
    hardwareSignature: string;
    mobileAppVersion: string;
    mobileAppVersionCode: number;
    requestId: string;
    sessionToken: string;
  }