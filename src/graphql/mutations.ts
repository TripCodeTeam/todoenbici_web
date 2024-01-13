import { gql } from "@apollo/client";

// User Mutations
export const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $password: String!
    $email: String!
    $avatar: String
  ) {
    createUser(
      username: $username
      password: $password
      email: $email
      avatar: $avatar
    ) {
      id
      username
      email
      avatar
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      avatar
      rol
      token
    }
  }
`;

export const LAST_CORDENATES = gql`
  query LastCordenate {
    lastCordenate {
      id
      latitude
      longitude
      country
      city
      state
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: String!
    $username: String
    $email: String
    $avatar: String
  ) {
    updateUser(id: $id, username: $username, email: $email, avatar: $avatar) {
      id
      username
      email
      avatar
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

// Post Mutations
export const CREATE_POST = gql`
  mutation CreatePost(
    $userId: ID!
    $content: String!
    $image: String
    $video: String
    $location: String
  ) {
    createPost(
      user: $user
      content: $content
      image: $image
      video: $video
      location: $location
    ) {
      id
      content
      image
      video
      location
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: String!
    $content: String
    $image: String
    $video: String
    $location: String
  ) {
    updatePost(
      id: $id
      content: $content
      image: $image
      video: $video
      location: $location
    ) {
      id
      content
      image
      video
      location
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: String!) {
    deletePost(id: $id) {
      id
    }
  }
`;

// Comment Mutations
export const CREATE_COMMENT = gql`
  mutation CreateComment(
    $userId: String!
    $postId: String!
    $content: String!
  ) {
    createComment(userId: $userId, postId: $postId, content: $content) {
      id
      content
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: String!, $content: String) {
    updateComment(id: $id, content: $content) {
      id
      content
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: String!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

// Like Mutations
export const CREATE_LIKE = gql`
  mutation CreateLike($userId: String!, $postId: String!) {
    createLike(userId: $userId, postId: $postId) {
      id
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation DeleteLike($id: String!) {
    deleteLike(id: $id) {
      id
    }
  }
`;

// Dislike Mutations
export const CREATE_DISLIKE = gql`
  mutation CreateDislike($userId: String!, $postId: String!) {
    createDislike(userId: $userId, postId: $postId) {
      id
    }
  }
`;

export const DELETE_DISLIKE = gql`
  mutation DeleteDislike($id: String!) {
    deleteDislike(id: $id) {
      id
    }
  }
`;

export const CREATE_TEMP_PLAYBACK_ID = gql`
  mutation CreateTempPlaybackId($playbackId: String!) {
    createTempPlaybackId(playbackId: $playbackId) {
      id
      playbackId
      createAt
    }
  }
`;

export const DELETE_TEMP_PLAYBACK_ID = gql`
  mutation deleteTempPlaybackId($playbackId: String!) {
    deleteTempPlaybackId(playbackId: $playbackId) {
      id
      playbackId
      createAt
    }
  }
`;
