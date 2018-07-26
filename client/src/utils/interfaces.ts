export interface User {
  fullname: string;
  username: string;
  email: string;
  bio: string;
  profile_pic: string;
  user_id?: number;
  stats?: Stats;
}

export interface Credentials {
  fullname?: string;
  username: string;
  email?: string;
  password: string;
}

export interface Stats {
  posts: number;
  followers: number;
  followings: number;
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

export interface Comment {
  comment_id: number;
  comment_text: string;
  created_at: string;
  username: string;
  profile_pic: string;
  user_id: number;
  media_id: number;
}