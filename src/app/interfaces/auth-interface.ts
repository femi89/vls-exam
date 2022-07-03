export interface RegisterPayloadInterface extends UserDetailInterface{
  password: string;
}
export interface LoginPayloadInterface {
  userName?: string;
  email?: string;
  password: string;
}
export interface UserDetailInterface {
  userId?: string;
  userName?: string;
  email?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
}
