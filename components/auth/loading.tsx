"use client";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-screen w-full  relative bg-neutral-100 touch-none  flex justify-center items-center">
      <Loader className="h-12 w-12 text-muted-foreground animate-spin" />
    </div>
  );
};

export default Loading;
