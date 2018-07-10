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

  url = ["http://www.youtube.com/embed/", "?enablejsapi=1&origin=http://localhost:4200"];

  constructor(private searchService: SearchService, private cd: ChangeDetectorRef, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.searchService.watching.subscribe(video => {
      this.videoId = video.id.videoId;
      this.cd.detectChanges();
    });
  }

  getUrl() {
    return (this.url[0] + this.videoId + this.url[1]);
  }

}
