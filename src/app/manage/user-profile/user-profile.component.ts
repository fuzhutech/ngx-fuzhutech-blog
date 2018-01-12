import {Component, OnInit, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../shared';
import {User} from '../../shared/model/user-model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user = new User();

  constructor(public router: Router,
              public activeRoute: ActivatedRoute,
              private userService: UserService) {

  }

  ngOnInit() {}

  save(event) {
    this.userService.edit(this.user).subscribe(
      data => {
        // console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
}
