import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OpenVideoService } from './open-video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  appClass: String = "app-no-video";
  
  constructor(private openVideoService: OpenVideoService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.openVideoService.watching.subscribe((video) => {
      if (video != null && video != undefined) this.appClass = "app";
      this.cd.detectChanges();
    });
  }

}
