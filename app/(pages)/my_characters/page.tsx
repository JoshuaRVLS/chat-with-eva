import React from "react";
import { QueryClient, HydrationBoundary } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import MyCharacters from "../components/MyCharacters/MyCharacters";

const page = async () => {
  const queryClient = new QueryClient();
  const session = await getServerSession();

  await queryClient.prefetchQuery({
    queryKey: ["myCharacters"],
    queryFn: () =>
      fetch(`/api/my-characters/${session?.user.id}`).then((res) =>
        res.json().then((data) => data.data)
      ),
  });

  return <MyCharacters />;
};

export default page;
