import {Component, OnInit} from '@angular/core';

import {ForgetPwdService} from '../../shared';
import {User} from '../../shared/model/user-model';
import {fadeIn} from '../../shared/animations/fade-in';

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.css'],
  animations: [fadeIn]
})
export class ForgetPwdComponent implements OnInit {
  public user: User = new User();
  public message: string;
  public messgeType: string;

  constructor(public forgetPwdService: ForgetPwdService) {
  }

  ngOnInit() {

  }

  public sendValidationEmail(): void {
    //
  }

}
