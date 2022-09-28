import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { UserManagerService } from 'src/app/user-management/@service/user-manager.service';
import { AppUtils } from 'src/app/utility/AppUtils';
import { FeedbackMessageList } from '../@model/feedbackMessageList';
import { FeedbackService } from '../@service/feedback.service';

@Component({
  selector: 'app-feedback-messages',
  templateUrl: './feedback-messages.component.html',
  styleUrls: ['./feedback-messages.component.scss'],
})
export class FeedbackMessagesComponent implements OnInit {
  headerText = 'Feedback Message';
  feedbackMessage:any;
  listfeedbackMessage:FeedbackMessageList[] = [];
  deviceId:any;
  appDeviceInfo:any;

  constructor(public feedbackService:FeedbackService, private userManagerService: UserManagerService) { }

  async ngOnInit() {
     this.feedbackMessage = history.state.feedbackMessage;
     this.deviceId = await Device.getId();
     this.appDeviceInfo = await Device.getInfo();
     this.getFeedbackMessages();
    debugger;
  }

  async getFeedbackMessages() {

    const obj = {
    threadId: this.feedbackMessage.threadId,
    deviceName: this.appDeviceInfo.deviceName,
    deviceNumber: this.deviceId.uuid,
    hardwareSignature: this.deviceId.uuid,
    mobileAppVersion: "1.0.0",
    mobileAppVersionCode: 1,
    requestId: AppUtils.generateId(16),
    clientType:"softbyte-customer-wallet",
    sessionToken: await this.userManagerService.getSessionToken()
    }

    this.feedbackService.getFeedbackMessage(obj).subscribe((res:any) => {
      console.log(res);
      this.listfeedbackMessage = res.data.feedbackMessages;
      console.log('feedbackmessage',res);
    }),
      (error) => {
        console.log('res', error);
      };
  }

}
