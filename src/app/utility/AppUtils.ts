import {Device} from "@capacitor/device";

export class AppUtils {
  public static generateId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  public static getAPPUuid() {
    return Device.getId().then(res => {
      return res.uuid
    })
  }

  public static getAppInfo() {
    return Device.getInfo();
  }
}
