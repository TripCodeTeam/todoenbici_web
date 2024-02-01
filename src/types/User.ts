// models.ts

export type Role = "viewer" | "streamer";

export type ScalarUser = {
  id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  rol: Role;
  avatar: string | undefined | null;
};

export type AuthUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  rol?: string;
  avatar?: string;
  token: string;
};

export type TempPlaybackId = {
  id: string;
  playbackId: string;
  createAt?: string;
};

export type ScalarPost = {
  id?: string;
  content: string;
  images?: string[];
  video?: string;
  location: string;
  userId: string;
};

export type ScalarComment = {
  id: string;
  content: string;
  userId: string;
};

export type Like = {
  id: string;
  postId: string;
  userId: string;
};

export type Dislike = {
  id: string;
  postId: string;
  userId: string;
};

export type Coordinates = {
  id: string;
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  state: string;
  createdAt: string;
};

export interface StreamData {
  live_stream_id: string;
  stream_key: string;
  playbackId: string;
  // Add other properties if necessary
}
