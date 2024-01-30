"use client";

import React, { useEffect, useState } from "react";
import styles from "./post.module.css";
import axios from "axios";
import UserService from "@/classes/User";
import Avatar from "react-avatar";
import LikeDislikeButton from "@/components/community/interactions/likedislike";
import { ScalarPost, ScalarUser, Role } from "@/types/User";
import { useGlobalContext } from "@/components/context/ContextDashboard";
import Link from "next/link";

function PostCards() {
  const [posts, setPosts] = useState<ScalarPost[]>([]);
  const [usersMap, setUsersMap] = useState<{ [key: string]: ScalarUser }>({});
  const { user } = useGlobalContext();

  useEffect(() => {
    // Fetch posts and update state
    const fetchPosts = async () => {
      try {
        const response = await axios.get("api/post/get");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Fetch user data for each post
    const fetchUserDataForPosts = async () => {
      try {
        await Promise.all(
          posts.map(async (post) => {
            if (!usersMap[post.userId]) {
              const response = await axios.post("/api/user/get", {
                id: post.userId,
              });
              const data: ScalarUser = response.data;

              setUsersMap((prevUsersMap) => ({
                ...prevUsersMap,
                [post.userId]: data,
              }));
            }
          })
        );
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserDataForPosts();
  }, [posts, usersMap]);

  return (
    <div className={styles.body}>
      {posts
        ? posts.map((post: ScalarPost, index) => (
            <div className={styles.cardPost} key={index}>
              <div className={styles.headerPost}>
                <div className={styles.boxUser}>
                  <div className={styles.avatarUser}>
                    <Avatar
                      src={usersMap[post.userId]?.avatar as string}
                      round={true}
                      size="30"
                    />
                  </div>
                  <p className={styles.nameUser}>
                    {usersMap[post.userId]?.firstName}
                    {/* {usersMap[post.userId]?.lastName} */}
                  </p>
                  <p className={styles.username}>
                    @{usersMap[post.userId]?.username}
                  </p>
                </div>
              </div>
              <p className={styles.ContentPost}>{post.content}</p>

              <div className={styles.boxImagesPost}>
                <div className={styles.centerImages}>
                  {post.images?.map((image) => (
                    <img key={image} className={styles.imgPost} src={image} />
                  ))}
                </div>
              </div>
              <LikeDislikeButton
                userId={user?.id as string}
                postId={post.id as string}
              />
            </div>
          ))
        : null}
    </div>
  );
}

export default PostCards;
