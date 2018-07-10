import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoCardComponent implements OnInit {

  @Input() video: Video;

  constructor() { }

  ngOnInit() {
  }

  expandVideo() {
    console.log(this.video);
  }

}
