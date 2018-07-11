import { Component, OnInit } from '@angular/core';
import { SignInService } from '../sign-in.service';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css']
})
export class LoginContainerComponent implements OnInit {

  constructor(private signInService: SignInService) { }

  ngOnInit() {
  }

  login() {
    this.signInService.googleSignIn();
  }

}
