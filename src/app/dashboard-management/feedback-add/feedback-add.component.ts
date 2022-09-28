import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { UserManagerService } from 'src/app/user-management/@service/user-manager.service';
import { AppUtils } from 'src/app/utility/AppUtils';
import { Feedback } from '../@model/feedback';
import { FeedbackService } from '../@service/feedback.service';

@Component({
  selector: 'app-feedback-add',
  templateUrl: './feedback-add.component.html',
  styleUrls: ['./feedback-add.component.scss'],
})
export class FeedbackAddComponent implements OnInit {
  headerText = 'Feedback';
  feedbackForm: FormGroup;
  feedback: Feedback = {
    topic:'',
    subject: '',
    message: '',
    deviceName: '',
    fileType: '',
    attachment: '',
    deviceNumber: '',
    hardwareSignature: '',
    mobileAppVersion: '',
    mobileAppVersionCode: 1,
    requestId: '',
    sessionToken: ''
  }
  deviceId:any;
  appDeviceInfo:any;
  isSubmitted = false;
  topic:any;

  constructor(
    private fb: FormBuilder,
    private userManagerService: UserManagerService,
    public feedbackService:FeedbackService,
    public router:Router
  ) { }

  async ngOnInit() {
    this.deviceId = await Device.getId();
    this.appDeviceInfo = await Device.getInfo();
    this.initFormGroup();
  }

  async initFormGroup() {
    this.feedbackForm = this.fb.group({
    topic:['', Validators.required],
    subject: ['', Validators.required],
    message: ['', Validators.required],
    attachment: [''],
    fileType: '',
    deviceName: this.appDeviceInfo.model,
    deviceNumber: this.deviceId.uuid,
    hardwareSignature: this.deviceId.uuid,
    mobileAppVersion: "1.0.0",
    mobileAppVersionCode: 1,
    requestId: AppUtils.generateId(16),
    sessionToken: await this.userManagerService.getSessionToken()
    });
    
  }
  createFeedBack(){

    this.isSubmitted = true;
    if (this.feedbackForm.invalid) {
      return;
  }

      this.feedback.topic = this.feedbackForm.value.topic
      this.feedback.subject = this.feedbackForm.value.topic + ', ' + this.feedbackForm.value.subject
      this.feedback.message = this.feedbackForm.value.message 
      this.feedback.deviceName = this.feedbackForm.value.deviceName
      this.feedback.fileType = this.feedbackForm.value.fileType
      this.feedback.attachment = this.feedbackForm.value.attachment
      this.feedback.deviceNumber = this.feedbackForm.value.deviceNumber
      this.feedback.hardwareSignature = this.feedbackForm.value.hardwareSignature
      this.feedback.mobileAppVersion = this.feedbackForm.value.mobileAppVersion
      this.feedback.mobileAppVersionCode = this.feedbackForm.value.mobileAppVersionCode
      this.feedback.requestId = this.feedbackForm.value.requestId
      this.feedback.sessionToken = this.feedbackForm.value.sessionToken

 

    this.feedbackService.createFeedback(this.feedback).subscribe((res:any) => {
      console.log(res);
      console.log('createFeedback', res);
      this.router.navigateByUrl('/feedback');
    }),
      (error) => {
        console.log('res', error);
      };
    
  }

  onSelectImage(event) {
    if (event.target.files.length > 0) {
      this.feedbackForm.value.attachment = event.target.files[0];
    }
    const formData = new FormData();
    formData.append('attachment', this.feedbackForm.value.attachment);
    const extension = this.feedbackForm.value.attachment.type;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      console.log(event.target.result);
      const base64String = event.target.result.split(',').pop();
      this.feedbackForm.value.attachment = base64String; 
      var fileExtension = extension.split("/").pop();
      this.feedbackForm.value.fileType = fileExtension;
      console.log('file type',this.feedbackForm.value.fileType);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  getTopic(event){
    this.feedbackForm.value.topic = event.target.value;
    this.topic = this.feedbackForm.value.topic;
    console.log('topic',  this.topic)
  }

}
