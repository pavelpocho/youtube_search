import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SearchService } from '../search.service';
import { Video } from '../video';
import { SignInService } from '../sign-in.service';
import { GoogleUser } from '../google-user';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  term: String = "";
  user: GoogleUser;
  videos: Video[];

  constructor(private searchService: SearchService, private signIn: SignInService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.signIn.user.subscribe((user: GoogleUser) => {
      console.log(user);
      this.user = user;
      this.cd.detectChanges();
    })
  }

  search() {
    if (this.term == "") return;
    this.searchService.search(this.term);
  }

  login() {
    this.signIn.googleSignIn();
  }

}
