import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Video } from '../video';
import { SearchService } from '../search.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  videoId: String;
  video: Video;
  videoDate: String;
  emptyDisplay: boolean = false;

  url = ["http://www.youtube.com/embed/", "?enablejsapi=1&origin=http://localhost:4200"];

  constructor(private searchService: SearchService, private cd: ChangeDetectorRef, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.searchService.videos.subscribe(data => {
      if (data != null && data != undefined) {
        this.emptyDisplay = true;
        this.cd.detectChanges();
      }
    });
    this.searchService.watching.subscribe(video => {
      this.videoId = video.id.videoId;
      this.emptyDisplay = false;
      this.video = video;
      this.videoDate = new Date(this.video.snippet.publishedAt).toLocaleString().split(",")[0];
      this.cd.detectChanges();
    });
  }

  getUrl() {
    return (this.url[0] + this.videoId + this.url[1]);
  }

}
