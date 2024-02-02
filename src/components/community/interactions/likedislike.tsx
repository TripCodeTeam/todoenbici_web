"use client";

import { useState } from "react";
import styles from "./styles.module.css";

import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";

import { IoHeartDislikeOutline } from "react-icons/io5";
import { IoHeartDislikeSharp } from "react-icons/io5";

const LikeDislikeButton = ({
  userId,
  postId,
  leftPadding,
}: {
  userId: string;
  postId: string;
  leftPadding: number;
}) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);

    // Aquí puedes enviar una solicitud al servidor para registrar el like en tu base de datos
    // Incluyendo userId y postId en la solicitud
    console.log(`Usuario ${userId} dio like al post ${postId}`);
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1);
    } else {
      setDislikes(dislikes + 1);
    }
    setDisliked(!disliked);

    // Aquí puedes enviar una solicitud al servidor para registrar el dislike en tu base de datos
    // Incluyendo userId y postId en la solicitud
    console.log(`Usuario ${userId} dio dislike al post ${postId}`);
  };

  return (
    <div
      className={styles.boxInteraction}
      style={{ paddingLeft: `${leftPadding}px` }}
    >
      <div className={styles.subBoxInteraction}>
        <div className={styles.iconBoxInteraction}>
          {liked ? (
            <IoHeartSharp
              size={20}
              onClick={handleLike}
              className={styles.iconHeartClose}
            />
          ) : (
            <IoHeartOutline
              size={20}
              onClick={handleLike}
              className={styles.iconHeartOpen}
            />
          )}
        </div>
        <p className={styles.countInteraction}>{likes}</p>
      </div>

      <div className={styles.subBoxInteraction}>
        <div className={styles.iconBoxInteraction}>
          {disliked ? (
            <IoHeartDislikeSharp
              size={20}
              onClick={handleDislike}
              className={styles.iconHeartClose}
            />
          ) : (
            <IoHeartDislikeOutline
              size={20}
              onClick={handleDislike}
              className={styles.iconHeartOpen}
            />
          )}
        </div>
        <p className={styles.countInteraction}>{dislikes}</p>
      </div>
    </div>
  );
};

export default LikeDislikeButton;
