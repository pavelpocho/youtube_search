import { Injectable } from '@angular/core';
import { Video } from './video';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenVideoService {

  watching = new Subject<Video>();

  rating = new Subject<Video>();

  openVideo(video: Video): void {
    this.watching.next(video);
  }

  constructor() { }

}
