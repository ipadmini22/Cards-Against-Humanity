import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FunctionsService } from '../services/functions.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  mail: string;
  password: string;

  constructor(private auth: AuthService, private func: FunctionsService) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.mail, this.password).then(r => {
      if (r) {
        this.func.showBasicToast('Successfully Registered');
      } else {
        this.func.showBasicToast('Error');
      }
    });
  }
}
