import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScalarComment } from "@/types/User";
import GetUserInfo from "../widgtes/GetUserInfo";
import LikeDislikeButton from "./likedislike";
import styles from "./comment.module.css";

interface CommentsBoxProps {
  postId: string;
  userId: string;
}

const CommentsBox: React.FC<CommentsBoxProps> = ({ postId, userId }) => {
  const [comments, setComments] = useState<ScalarComment[] | null>(null);
  const [heightComments, setHeightComments] = useState("")

  useEffect(() => {
    // Obtener los comentarios cuando el componente se monta
    axios
      .post("/api/interacctions/comment/getbypost", { postId })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error obteniendo los comentarios", error);
      });
  }, [postId]);

  if (!comments) {
    return <div>Cargando ...</div>;
  }

  return (
    <div className={styles.supraBox} style={{}}>
      {comments.length > 0 ? (
        comments.map((comment: ScalarComment, index) => (
          <div key={index} className={styles.boxComment}>
            <GetUserInfo userId={comment.userId} />
            <p>{comment.content}</p>
            <LikeDislikeButton
              postId={postId}
              userId={userId}
              leftPadding={0}
            />
          </div>
        ))
      ) : (
        <div>No hay comentarios para mostrar.</div>
      )}
    </div>
  );
};

export default CommentsBox;
