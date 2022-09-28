export interface ChangePin {
    clientType: string;
    newPin: string;
    oldPin: string;
    forcePinChange: string;
    deviceName: string;
    deviceNumber: string;
    hardwareSignature: string;
    mobileAppVersion: string;
    mobileAppVersionCode: number;
    requestId: string;
    sessionToken: string;
}