"use client";

import Action from "@/app/(dashboard)/_components/action";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRenameModel } from "@/store/use-rename-model";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

interface InfoProps {
  boardId: string;
}

const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModel();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Link href={"/"} className={cn("font-semibold text-2xl", font.className)}>
        Board
      </Link>
      <span className="text-neutral-300 px-1.5"> | </span>
      <Button
        onClick={() => onOpen(data._id, data.title)}
        className="text-base font-normal px-2"
        variant={"ghost"}
      >
        {data.title}
      </Button>
      <span className="text-neutral-300 px-1.5"> | </span>
      <Action title={data.title} id={data._id} side="bottom" sideOffset={10}>
        <div>
          <Button
            onClick={() => onOpen(data._id, data.title)}
            className="text-base font-normal px-2"
            variant={"ghost"}
          >
            <Menu />
          </Button>
        </div>
      </Action>
    </div>
  );
};

export default Info;
const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white w-[300px] rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Skeleton className="h-full w-full bg-muted-400 " />
    </div>
  );
};
