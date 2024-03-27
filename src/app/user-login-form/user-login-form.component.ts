import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { UserRegistrationService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router'
/**
 * @selector 'app-user-login-form'
 * @templateUrl './user-login-form.component.html'
 * @styleUrls ['./user-login-form.component.scss']
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: ''};
/**
 * @constructor
 * @param {UserRegistrationService} fetchApiData
 * @param {MatDialogRef} dialogRef
 * @param {MatSnackBar} snackBar
 * @param {Router} router
 */
constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

ngOnInit(): void {
}
// This is the function responsible for sending the form inputs to the backend
LoginUser(): void {
  this.fetchApiData.userLogin(this.userData).subscribe((result) => {
   localStorage.setItem('user', JSON.stringify(result.user));
   localStorage.setItem('token', result.token);
   this.dialogRef.close(); // This will close the modal on success!
   this.snackBar.open('User Login Sucessful', 'OK', {
      duration: 2000
   });
   this.router.navigate(['movies']);
  }, (result) => {
    this.snackBar.open(result, 'OK', {
      duration: 2000
    });
  });
}

}