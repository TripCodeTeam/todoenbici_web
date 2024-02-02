"use client";

import React, { useEffect, useState } from "react";
import styles from "./post.module.css";
import axios from "axios";
import LikeDislikeButton from "@/components/community/interactions/likedislike";
import { ScalarPost, ScalarUser, Role, AuthUser } from "@/types/User";
import { useGlobalContext } from "@/components/context/ContextDashboard";
import Image from "next/image";

import { IoChatbubbleOutline } from "react-icons/io5";
import { IoChatbubbleSharp } from "react-icons/io5";
import CommentsBox from "../interactions/comments";
import PostCard from "./CardPostCard";

function PostCards() {
  const [posts, setPosts] = useState<ScalarPost[]>([]);
  const [usersMap, setUsersMap] = useState<{ [key: string]: ScalarUser }>({});
  const [viewComment, setViewComment] = useState<{ [postId: string]: boolean }>(
    {}
  );
  const { user } = useGlobalContext();

  useEffect(() => {
    // Fetch posts and update state
    const fetchPosts = async () => {
      try {
      const response = await axios.get("api/post/get")
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error("Error: response.data is not an array", response.data);
        }
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, [user?.token]);

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

    let isMounted = true;

    if (isMounted) {
      fetchUserDataForPosts();
    }

    return () => {
      isMounted = false;
    };
  }, [posts, usersMap, user?.token]);

  const handleOpenComments = (postId: string) => {
    setViewComment((prevViewComments) => ({
      ...prevViewComments,
      [postId]: !prevViewComments[postId],
    }));
  };

  return (
    <div className={styles.body}>
      {posts
        ? posts.map((post: ScalarPost, index) => (
            <PostCard
              key={index}
              post={post}
              usersMap={usersMap}
              user={user as AuthUser}
              viewComment={viewComment[post?.id as string] || false}
              handleOpenComments={() => handleOpenComments(post.id as string)}
            />
          ))
        : null}
    </div>
  );
}

export default PostCards;
