import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserEnrollDate, UserName, UserStandard, UserSubject } from 'src/app/core/model';
import { UserService } from '../../core/dataService';

@Injectable()
export class UserDetailService {

  public userName: BehaviorSubject<UserName> = new BehaviorSubject(null);
  public userImage: BehaviorSubject<string> = new BehaviorSubject(null);
  public userAddress: BehaviorSubject<string> = new BehaviorSubject(null);
  public userPN: BehaviorSubject<bigint> = new BehaviorSubject(null);
  public userPPN: BehaviorSubject<bigint> = new BehaviorSubject(null);
  public userSchool: BehaviorSubject<string> = new BehaviorSubject(null);
  public userEnrollDate: BehaviorSubject<UserEnrollDate> = new BehaviorSubject(null);
  public userStandard: BehaviorSubject<UserStandard> = new BehaviorSubject(null);
  public userSubject: BehaviorSubject<UserSubject[]> = new BehaviorSubject(null);
  public userEmail: BehaviorSubject<string> = new BehaviorSubject(null);
  public userStandardId: BehaviorSubject<number> = new BehaviorSubject(null);
  
  constructor(private userService: UserService) { }

  public getUser(id: number){
      this.userService.getUserName(id).subscribe(res => {
        this.userName.next(res);
      });
      this.userService.getUserImage(id).subscribe(res => {
        this.userImage.next(res.image);
      });
      this.userService.getUserAddress(id).subscribe(res => {
        this.userAddress.next(res.address);
      });
      this.userService.getUserPN(id).subscribe(res => {
        this.userPN.next(res.studentPN);
      });
      this.userService.getUserPPN(id).subscribe(res => {
        this.userPPN.next(res.parentPN);
      });
      this.userService.getUserEnrollDate(id).subscribe(res => {
        this.userEnrollDate.next(res);
      });
      this.userService.getUserStandard(id).subscribe(res => {
        this.userStandard.next(res);
      });
      this.userService.getUserSubject(id).subscribe(res => {
        this.userSubject.next(res);
      });
      this.userService.getUserEmail(id).subscribe(res => {
        this.userEmail.next(res.email);
      });
  }


}
