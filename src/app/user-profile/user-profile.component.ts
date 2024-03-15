import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  @Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

  constructor(public fetchApiData: UserRegistrationService) { }

ngOnInit(): void {
  this.getUser();
}

getUser(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }
}