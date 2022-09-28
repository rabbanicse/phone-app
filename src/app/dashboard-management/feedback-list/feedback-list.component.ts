import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../@service/feedback.service';
import { Storage } from '@capacitor/storage';
import { Device } from '@capacitor/device';
import { AppUtils } from 'src/app/utility/AppUtils';
import { UserManagerService } from 'src/app/user-management/@service/user-manager.service';
import { FeedbackList } from '../@model/feedbackList';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss'],
})
export class FeedbackListComponent implements OnInit {
  headerText = 'Feedback';
  deviceId: any;
  appDeviceInfo: any;
  listFeedback:FeedbackList[]=[];
  date:any;
  topic:any;
  subject:any;
  topicsubject:any
  feedbackMessage:{}

  constructor(public feedbackService:FeedbackService,private userManagerService: UserManagerService, private router: Router) { }

  async ngOnInit() {
    this.topic = '';
    this.deviceId = await Device.getId();
    this.appDeviceInfo = await Device.getInfo();
    this.getFeedback();
  }

  async getFeedback() {
    const { value } = await Storage.get({ key: 'phoneNo' });

    const obj = {
    deviceName: this.appDeviceInfo.deviceName,
    deviceNumber: this.deviceId.uuid,
    hardwareSignature: this.deviceId.uuid,
    mobileAppVersion: "1.0.0",
    mobileAppVersionCode: 1,
    requestId: AppUtils.generateId(16),
    sessionToken: await this.userManagerService.getSessionToken()
    }

    this.feedbackService.getFeedback(obj).subscribe((res:any) => {
      console.log(res);
      this.listFeedback = res.data.feedbackResponses
      console.log('getFeedback', res);
      this.listFeedback.forEach(element => {
      this.date = new Date(element.createdAt).toLocaleDateString("en-US");
      this.topicsubject =  element.subject.split(',');
      // const base64String =  element.subject.split(',').pop();
      // console.log('topic split', base64String);
      [this.topic, this.subject ] = this.topicsubject;
      console.log(this.topic, this.subject);

      
      });
    }),
      (error) => {
        console.log('res', error);
      };
  }

  getFeedbackMessages(item){
    //this.feedbackMessage = this.listFeedback;
    this.router.navigateByUrl('/feedback-message',{state:{feedbackMessage:item}});
    debugger;
  }

}