export enum SettingsEnum {
  logout = "Logout",
  signIn = "SignIn",
}

export interface ISettings {
  logout: SettingsEnum.logout;
  signIn: SettingsEnum.signIn;
}
