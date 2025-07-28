import React from "react";
import { QueryClient, HydrationBoundary } from "@tanstack/react-query";

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["myCharacters"],
  });

  return <div></div>;
};

export default page;
