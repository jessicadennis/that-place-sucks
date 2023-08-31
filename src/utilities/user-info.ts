import { Auth } from "aws-amplify";

export enum Groups {
  Admin = "admin",
  SuperUser = "superuser",
  User = "user",
}

export default class UserInfo {
  async getUserGroups() {
    const groups = await this.getUser();
    return (
      groups.getSignInUserSession().getAccessToken().payload[
        "cognito:groups"
      ] ?? []
    );
  }

  async getISuperUser() {
    const groups = await this.getUserGroups();
    return groups.includes(Groups.SuperUser);
  }

  async getIsAdmin() {
    const groups = await this.getUserGroups();
    return groups.includes(Groups.Admin);
  }

  async getIsAdminOrSuperUser() {
    const isAdmin = await this.getIsAdmin();
    const isSU = await this.getISuperUser();
    return isAdmin || isSU;
  }

  async getUser() {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  }
}
