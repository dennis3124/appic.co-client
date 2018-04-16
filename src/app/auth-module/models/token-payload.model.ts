export interface UserLoginModel {
  email: string;
  password: string;
}

export interface UserRegistrationModel {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
