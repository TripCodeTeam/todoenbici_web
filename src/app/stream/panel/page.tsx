"use client";

import { useAuth } from "@/components/Stream/context/useSession";
import StreamAdmin from "@/components/liveStream/StreamAdmin";
import AssetsStreams from "@/components/liveStream/assetsStreams";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Panel() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (!loading) {
    if (user.rol == "streamer") {
      return (
        <>
          <StreamAdmin />
          <AssetsStreams />
        </>
      );
    } else {
      router.push("/stream");
    }
  }
}

export default Panel;
