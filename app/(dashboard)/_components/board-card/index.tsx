"use client";

import Image from "next/image";
import Link from "next/link";
import Overlay from "./overlay";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useAuth } from "@clerk/nextjs";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import Action from "../action";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutations";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavourite: boolean;
}

const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavourite,
}: BoardCardProps) => {
  const { mutate: onFavourite, pending: pendingFavourite } = useApiMutation(
    api.board.favourite
  );
  const { mutate: onUnFavourite, pending: pendingUnFavourite } = useApiMutation(
    api.board.unFavourite
  );

  const toggleFavourite = () => {
    if (isFavourite) {
      onUnFavourite({ id }).catch(() => toast.error(`Something went wrong`));
    } else {
      onFavourite({ id, orgId }).catch(() =>
        toast.error("Something went wrong")
      );
    }
  };

  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Action id={id} title={title} side="right">
            <button className=" absolute opacity-0  group-hover:opacity-100 transition-opacity px-3 py-2 outline-none  top-1 right-1">
              <MoreHorizontal className=" text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Action>
        </div>
        <Footer
          isFavourite={isFavourite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavourite}
          disable={pendingFavourite || pendingUnFavourite}
        />
      </div>
    </Link>
  );
};

export default BoardCard;

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className=" aspect-[100/127]  rounded-lg justify-between overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
