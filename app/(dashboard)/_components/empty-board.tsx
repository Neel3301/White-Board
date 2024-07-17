"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EmptyBoard = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: "untitled",
    })
      .then((id) => {
        toast.success("Board Created");
        router.push(`/board/${id}`);
      })
      .catch(() => toast.error("Something went wrong"));
  };
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image src={"/note.png"} alt="emptySearch" height={140} width={140} />
      <h2 className="text-2xl mt-6 font-semibold">No Board Found</h2>
      <h2 className="text-sm text-muted-foreground mt-2">
        Create a Board To Continue
      </h2>
      <Button onClick={onClick} disabled={pending} className="mt-6" size={"lg"}>
        create Board
      </Button>
    </div>
  );
};

export default EmptyBoard;
