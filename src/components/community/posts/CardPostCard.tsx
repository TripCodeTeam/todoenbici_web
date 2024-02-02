// PostCard.js
import React from "react";
import Avatar from "react-avatar";
import Image from "next/image";
import LikeDislikeButton from "@/components/community/interactions/likedislike";
import { IoChatbubbleOutline, IoChatbubbleSharp } from "react-icons/io5";
import CommentsBox from "../interactions/comments";

import styles from "./post.module.css";
import { AuthUser, ScalarPost, ScalarUser } from "@/types/User";
import { useMediaQuery } from "react-responsive";
import InputComment from "../interactions/InputComment";

interface PostCardProps {
  post: ScalarPost;
  usersMap: { [key: string]: ScalarUser };
  user: AuthUser;
  viewComment: boolean;
  handleOpenComments: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  usersMap,
  user,
  viewComment,
  handleOpenComments,
}) => {
  const isPhone = useMediaQuery({
    query: "(max-width: 800px)",
  });
  return (
    <div className={styles.cardPost}>
      <div className={styles.headerPost}>
        <div className={styles.boxUser}>
          <div className={styles.avatarUser}>
            <Avatar
              src={usersMap[post.userId]?.avatar as string}
              round={true}
              size="30"
            />
          </div>
          <p className={styles.nameUser}>{usersMap[post.userId]?.firstName}</p>
          <p className={styles.username}>@{usersMap[post.userId]?.username}</p>
        </div>
      </div>
      <p className={styles.ContentPost}>{post.content}</p>

      <div className={styles.boxImagesPost}>
        <div className={styles.centerImages}>
          {post.images?.map((image) => (
            <Image
              key={image}
              className={styles.imgPost}
              src={image}
              alt=""
              width={300}
              height={300}
            />
          ))}
        </div>
      </div>
      <div className={styles.zoneInteractions}>
        <LikeDislikeButton
          userId={user?.id as string}
          postId={post.id as string}
          leftPadding={isPhone ? 0 : 35}
        />
        <div className={styles.commentsBtn} onClick={handleOpenComments}>
          {viewComment ? (
            <IoChatbubbleSharp size={20} />
          ) : (
            <IoChatbubbleOutline size={20} />
          )}
        </div>
      </div>
      {viewComment ? (
        <>
          <CommentsBox postId={post.id as string} userId={user?.id as string} />
          <InputComment />
        </>
      ) : null}
    </div>
  );
};

export default PostCard;
