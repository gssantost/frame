export interface User {
  fullname: string;
  username: string;
  email: string;
  bio: string;
  profile_pic: string;
}

export interface Credentials {
  fullname?: string;
  username: string;
  email?: string;
  password: string;
}