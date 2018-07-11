import { Injectable } from '@angular/core';
import { GoogleApiService } from 'ng-gapi';
import { GoogleUser } from './google-user';
import { SearchService } from './search.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  user: Subject<GoogleUser> = new Subject<GoogleUser>();

  constructor(private gapiService: GoogleApiService, private searchService: SearchService) {
    
  }

  googleSignIn() {
    this.gapiService.onLoad().subscribe(() => {
      gapi.load("auth2", () => {
        console.log("About to init");
        gapi.auth2.init({
          client_id: "498408591122-91p3073ucantaqmg981lkl0p1o3dhedn.apps.googleusercontent.com",
          scope: 'https://www.googleapis.com/auth/youtube.readonly email'
        }).then(async () => {
          var authInstance = gapi.auth2.getAuthInstance();
          var googleUser = await authInstance.signIn({
            scope: 'https://www.googleapis.com/auth/youtube email'
          });
          var profile = googleUser.getBasicProfile();
          var gU = new GoogleUser();
          gU.email = profile.getEmail();
          gU.firstName = profile.getGivenName();
          gU.lastName = profile.getFamilyName();
          this.searchService.getSubscriptions();
          this.user.next(gU);
        })
      })
    });
  }

}
