import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Video } from '../video';
import { SearchService } from '../search.service';
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, OnChanges {

  videos: Video[];

  constructor(private searchService: SearchService, private cd: ChangeDetectorRef) { }

  ngOnChanges() {

  }

  ngOnInit() {
    console.log("ListInit");
    this.searchService.videos.subscribe(data => {
      console.log("Recieved in list");
      this.videos = data;
      this.cd.detectChanges();
    });
  }
}
