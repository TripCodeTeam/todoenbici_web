import UserService from "@/classes/User";
import { useGlobalContext } from "@/components/context/ContextDashboard";
import { ScalarUser } from "@/types/User";
import axios from "axios";
import styles from "./info.module.css";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";

interface GetInfoUser {
  userId: string;
}

function GetUserInfo({ userId }: GetInfoUser) {
  const [userDetails, setUserDetails] = useState<ScalarUser | null>(null);
  const { user } = useGlobalContext();

  useEffect(() => {
    const getDetails = async () => {
      const id = userId;
      const response = await axios.post(
        "/api/user/get",
        { id },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setUserDetails(response.data);
    };

    getDetails();
  }, [userId, user?.token]);
  return (
    <>
      <div className={styles.containerUser}>
        <div className={styles.boxAvatar}>
          <Avatar src={userDetails?.avatar as string} round={true} size="20" />
        </div>
        <p className={styles.boxUsername}>{userDetails?.username}</p>
      </div>
    </>
  );
}

export default GetUserInfo;
