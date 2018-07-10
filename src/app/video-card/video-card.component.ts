import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Video } from '../video';
import { SearchService } from '../search.service';
import { OpenVideoService } from '../open-video.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoCardComponent implements OnInit {

  @Input() video: Video;
  videoDate: String;

  constructor(private searchService: SearchService, private openVideoService: OpenVideoService) { }

  ngOnInit() {
    this.videoDate = new Date(this.video.snippet.publishedAt).toLocaleString().split(",")[0];
  }

  expandVideo() {
    this.searchService.openVideo(this.video);
    this.openVideoService.openVideo(this.video);
  }

}
