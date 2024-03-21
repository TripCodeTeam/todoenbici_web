import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./comments.module.css";
import { IoIosColorWand } from "react-icons/io";
import { RiEmojiStickerLine } from "react-icons/ri";
import { useWebSocket } from "next-ws/client";
import { useGlobalContext } from "@/components/context/ContextDashboard";
import { LuSendHorizonal } from "react-icons/lu";
import axios from "axios";

function CommentsContainer({
  inLive,
  streamId,
  userId,
}: {
  inLive: boolean;
  streamId: string;
  userId: string;
}) {
  const ws = useWebSocket();
  const user = useGlobalContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async () => {
    const comment = inputRef.current?.value ?? "";
    ws?.send(JSON.stringify({ userId, streamId, comment }));
    const data = { userId, streamId, comment };
    const response = await axios.post("/api/stream/comments/new", data);
    console.log(response.data);
    inputRef.current ? (inputRef.current.value = "") : null;
  };

  return (
    <>
      <div className={styles.boxComment}>
        <input
          className={styles.inputComment}
          ref={inputRef}
          type="text"
          disabled={inLive == false && user.user?.id ? false : true}
        />
        <div className={styles.centerIconSend}>
          <LuSendHorizonal size={25} onClick={sendMessage} />
        </div>

        {/* <div className={styles.donateBtn}>
          <div className={styles.centerDonate}>
            <div className={styles.circleDonatBtn}>
              <IoIosColorWand className={styles.iconBtnDonate} size={25} />
            </div>
            <div className={styles.circleDonatBtn}>
              <RiEmojiStickerLine className={styles.iconBtnDonate} size={25} />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default CommentsContainer;
