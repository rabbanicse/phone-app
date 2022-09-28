export interface NidObject {
  fileTypeFirstPage: string;
  fileTypeSecondPage: string;
  nid?: string;
  nidHMac: string;
  nidImageFirstPage: string;
  nidImageSecondPage: string;
}

export interface Customer {
  clientType: string;
  customerName: string;
  dateOfBirth: string;
  districtCode: string;
  email: string;
  estimatedMonthlyIncomeCode: string;
  fatherName: string;
  fileTypeProfilePicture: string;
  gender: string;
  mobileNumber: string;
  motherName: string;
  nidObject?: NidObject;
  occupationCode: string;
  operatorCode: string;
  permanentAddress: string;
  pin: string;
  presentAddress: string;
  profilePicture: string;
  profitAccountType: string;
  referralCode: string;
  sourceOfIncomeCode: string;
  unionCode: string;
  upazilaCode: string;
  userType: string;
  deviceName: string;
  deviceNumber: string;
  hardwareSignature: string;
  mobileAppVersion: string;
  mobileAppVersionCode: number;
  requestId: string;
  sessionToken: string;
}

class UserRegistration {
  nidNo: string;
  nidName: string;
  clientType: string;
  customerName: string;
  dateOfBirth: string;
  districtCode: string;
  email: string;
  estimatedMonthlyIncomeCode: string;
  fatherName: string;
  fileTypeProfilePicture: string;
  gender: string;
  mobileNumber: string;
  motherName: string;
  nidObject: NidObject;
  occupationCode: string;
  operatorCode: string;
  permanentAddress: string;
  pin: string;
  presentAddress: string;
  profilePicture: string;
  profitAccountType: string;
  referralCode: string;
  sourceOfIncomeCode: string;
  unionCode: string;
  upazilaCode: string;
  userType: string;
  deviceName: string;
  deviceNumber: string;
  hardwareSignature: string;
  mobileAppVersion: string;
  mobileAppVersionCode: number;
  requestId: string;
  sessionToken: string;
}

