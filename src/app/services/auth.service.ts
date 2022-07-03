import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {LoginPayloadInterface, RegisterPayloadInterface, UserDetailInterface} from "@vls/interfaces/auth-interface";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userProfiles: BehaviorSubject<UserDetailInterface | null> = new BehaviorSubject<UserDetailInterface | null>(null);
  public appUsers: BehaviorSubject<UserDetailInterface[]> = new BehaviorSubject<UserDetailInterface[]>([]);
  public allUsers$: Observable<UserDetailInterface[]>;
  public userProfile$: Observable<UserDetailInterface | null>;
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.userProfile$ = this.userProfiles.asObservable();
    this.allUsers$ = this.appUsers.asObservable();
  }
  public setAppUsers(users: UserDetailInterface[]):void {
    users.map(user => {
      user.fullName = `${user.firstName} ${user.lastName}`;
      return user;
    })
    this.appUsers.next(users);
  }
  public setUserProfile(users: UserDetailInterface):void {
    this.userProfiles.next(users);
  }
  public logout(): void {
    this.userProfiles.next(null);
    this.userProfiles.complete();
    this.router.navigate(['auth']);
  }
  public login(payload: LoginPayloadInterface): void {
    this.router.navigate(['auth']);
  }
  public register(data: RegisterPayloadInterface[]): Observable<any> {
    const reqData = {
      data,
      file: 'users.json',
    }
    return this.httpClient.post(environment.jsonApi, reqData);
  }
  public getUserProfile(): UserDetailInterface | null {
    return (this.userProfiles.getValue() || null);
  }
  public isAuthenticated(): boolean {
    console.log(this.getUserProfile());
    return (this.getUserProfile() !==null);
  }
  public getAllUsers(): Observable<RegisterPayloadInterface[]> {
    return this.httpClient.get<RegisterPayloadInterface[]>('assets/data/users.json');
  }

  private verifyUserAccount(userData: UserDetailInterface): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if(userData) {
        resolve (true);
      } else {
        reject (false);
      }
    });
  };
}
