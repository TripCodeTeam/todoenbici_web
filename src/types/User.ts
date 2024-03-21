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
  title: string;
  content: string;
  images?: string[];
  videos?: string[];
  location?: string;
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
  latitude: string;
  longitude: string;
  country: string;
  city: string;
  state: string;
  createdAt: string;
};

export type ScalarStreamComments = {
  id?: string;
  userId: string;
  streamId: string;
  comment: string;
  createdAt?: Date;
};

export interface StreamData {
  live_stream_id: string;
  stream_key: string;
  playbackId: string;
  // Add other properties if necessary
}

export interface MuxEvent {
  type: string;
  data: any;
}
