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

export interface Post {
  user_id?: number;
  username?: string;
  profile_pic?: string;
  created_at: string;
  media_url: string;
  media_des: string;
  media_id: number;
}