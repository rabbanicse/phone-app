export enum FormType {
  card = 'ADD_CARD',
  registration = 'REGISTRATION',
  payment = 'PAYMENT',
  customer = 'Added Customer'
}

export enum RecordStatus {
    active = 1,
    inactive = 2,
    delete = 3
  }

  export enum ResponseStatus {
    success = 200,
    created = 201,
    accepted = 202,
    nonAuthoritativeInformation = 203,
    noContent = 204,
    resetContent = 205,
    partialContent = 206,
    multiStatus = 207,
    alreadyReported = 208,
    imUsed = 226,
    internalServerError = 500,
    notImplemented = 501,
    badGateway = 502,
    serviceUnavailable = 503,
    gatewayTimeout = 504,
    httpVersionNotSupported = 505,
    insufficientStorage = 507,
    loopDetected = 508,
    networkAuthenticationRequired = 511,
    badRequest = 400,
    unauthorized = 401,
    paymentRequired = 402,
    forbidden = 403,
    fail = 404,
    methodNotAllowed = 405,
    notAcceptable = 406,
    proxyAuthenticationRequired = 407,
    requestTimeout = 408,
    conflict = 409,
    gone = 410,
    lengthRequired = 411,
    payloadTooLarge = 413,
    unsupportedMediaType = 415,
    misdirectedRequest = 421,
    failedDependency = 424,
    tooEarly = 425,
    upgradeRequired = 426,
    tooManyRequests = 429,
    unavailableForLegalReasons = 451,
    info = 300,
    movedPermanently = 301,
    found = 302,
    seeOther = 303,
    notModified = 304,
    useProxy = 305,
    unUsed = 306,
    temporaryRedirect = 307,
    permanentRedirect = 308
  }

  export enum Language {
      bangla = 'Bangla',
      english = 'English'
  }

  export enum DataType {
    image = 1,
    Text = 2,
    Video = 4
  }

  export enum UserRole {
    user = 1,
    admin = 2,
  }

  export enum CommonAction {
    Active = 1,
    Inactive = 2,
    Remove = 3,
    View = 4,
    Edit = 5
  }
  export enum AppType{
    Android = 1,
    iOS = 2
  }

  export enum EnumPanicUserType{
    None = 0,
    PanicCreator = 1,
    PanicAuthority = 2,
    Both = 3
  }

  export enum EnumAvailability{
    None = null,
    Unavailable = 0,
    Available = 1
  }

  export enum EnumStatus{
    None = 0,
    Active = 1,
    Inactive = 2,
    Deleted = 3,
    Pending = 4,
    Registered = 5,
    Online = 6,
    Offline = 7
  }

  export enum EnumContactType{
    None = 0,
    Phone = 1,
    Email = 2
  }
  export enum EnumCheckType
  {
    Radio = 1,
    Checkbox = 2
  }

  export enum ClientType
  {
    ClientWallet = 'softbyte-customer-wallet',
    FcmKey = 'c_WELO7pM1c:APA91bEY4-tx-JmBjA9kC4cw1g3-GXE8roHjoEFrem_JqJN9vv329v7eGUYIlnpcJTn1Y7ANrBHZlaj8nFRKElhW9mFGkTTeo0BPK0t2nm_1hH7OM1J_LTwT-6c2DMXdPNIPL4NSHFBR',
    DeviceName='Xioami',
    HardwareSignature = 'f2974f643eb3893146ddf0e447ee79a0a40fe1b7c107725e3427289601c760c3c7032c5e3a2487ef0b637f39b059a2feeccfd7a4b372c5242a556c380fe79ece',
    RequestId = 'D9CAA98464A1BDC7'
  }

  export enum Operator {
    GRAMEENPHONE = 1,
    BANGLALINK = 2,
    ROBI = 3,
    AIRTEL = 4,
    TELETALK = 5
  }

  export enum OperatorDigit {
    GRAMEENPHONE = '017',
    BANGLALINK = '019',
    ROBI = '018',
    AIRTEL = '016',
    TELETALK = '015'
  }


  export const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  export const MonthsNumber = 
  [
    {'monthName':'January', 'month' :'1'},
    {'monthName':'February','month':'2'},
    {'monthName':'March', 'month': '3'},
    {'monthName':'April', 'month': '4'},
    {'monthName': 'May', 'month': '5'},
    {'monthName':'June', 'month':'6'},
    {'monthName':'July', 'month': '7'},
    {'monthName':'August', 'month': '8'},
    {'monthName':'September', 'month': '9'},
    {'monthName':'October', 'month': '10'},
    {'monthName':'November', 'month':'11'},
    {'monthName':'December', 'month': '12'}
  ]
    
    
    
    
   
    
    
    
    
    
    
    
  

  export enum RentStatus{
    Generate = 1,
    Paid = 2
  }



  export const NO_OF_AUTO_COMPLETE_DATA = 100;
  export const NO_OF_ROW_DATA = 20;
