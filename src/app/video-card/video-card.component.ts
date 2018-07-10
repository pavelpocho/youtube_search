import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Video } from '../video';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoCardComponent implements OnInit {

  @Input() video: Video;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  expandVideo() {
    this.searchService.openVideo(this.video);
  }

}
