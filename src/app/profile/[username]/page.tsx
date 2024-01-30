import React from "react";

function Profile({ params }: { params: { username: string } }) {
  return (
    <>
      <p>Hello {params.username}</p>
    </>
  );
}

export default Profile;
