import { ScalarUser } from "@/types/User";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import styles from "./comments.module.css";
import { timeSince } from "../../handlers/convertidores";

function UserComment({ userId, time }: { userId: string; time: Date | undefined }) {
  const [infoUser, setInfoUser] = useState<ScalarUser | null>(null);

  useEffect(() => {
    const getInfoUser = async () => {
      const response = await axios.post("api/user/get", {
        id: userId,
      });
      setInfoUser(response.data);
    };

    getInfoUser();
  }, [userId]);

  

  return (
    <>
      <div className={styles.headerUser}>
        <div className={styles.boxImageUser}>
          <Avatar src={infoUser?.avatar as string} round={true} size="20" />
        </div>
        <p className={styles.nameUser}>{infoUser?.firstName}</p>
        {/* <p>{time?.getSeconds}</p> */}
        {/* <p>{timeSince()}</p> */}
      </div>
    </>
  );
}

export default UserComment;
