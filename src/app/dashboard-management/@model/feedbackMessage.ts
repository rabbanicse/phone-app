export interface FeedbackMessage {
    threadId: number;
    message: string;
    deviceName: string;
    deviceNumber: string;
    hardwareSignature: string;
    mobileAppVersion: number;
    mobileAppVersionCode: string;
    requestId: string;
     sessionToken: string;
  }