import { Auth } from "aws-amplify";
import { Observable, from, map } from "rxjs";

export enum Groups {
  Admin = "admin",
  SuperUser = "superuser",
  User = "user",
}

const userInfo$ = from(Auth.currentAuthenticatedUser());

export default {
  get user(): Observable<any> {
    return userInfo$;
  },

  get userGroups(): Observable<string[]> {
    return userInfo$.pipe(
      map(
        (info) =>
          info.getSignInUserSession()?.getAccessToken()?.payload[
            "cognito:groups"
          ]
      ) ?? []
    );
  },

  get isSuperUser(): Observable<boolean> {
    return this.userGroups.pipe(
      map((groups) => groups.includes(Groups.SuperUser))
    );
  },

  get isAdmin(): Observable<boolean> {
    return this.userGroups.pipe(map((groups) => groups.includes(Groups.Admin)));
  },

  get isAdminOrSuperUser(): Observable<boolean> {
    return this.userGroups.pipe(
      map(
        (groups) =>
          groups.includes(Groups.SuperUser) || groups.includes(Groups.Admin)
      )
    );
  },
};
