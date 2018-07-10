import { Injectable } from '@angular/core';
import { Video } from './video';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenVideoService {

  watching = new Subject<Video>();

  openVideo(video): void {
    this.watching.next(video);
  }

  constructor() { }

}
