import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private fileReader: FileReader = new FileReader();


  constructor() { }

  handleImageSelection(blob: Blob): Observable<string> {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(blob);
    return new Observable((observer) => {
      this.fileReader.onloadend = () => {
        observer.next(this.fileReader.result as string);
        observer.complete();
      };
    });
  }
}
