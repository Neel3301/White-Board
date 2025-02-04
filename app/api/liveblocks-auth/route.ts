import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { query } from "@/convex/_generated/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  const authorization = await auth();
  const user = await currentUser();

  // console.log("Auth_info 1", { authorization, user });

  if (!authorization || !user) {
    return new Response("Unauthorize", { status: 403 });
  }

  const { room } = await req.json();
  const board = await convex.query(api.board.get, { id: room });

  // console.log("Auth_info 2", {
  //   room,
  //   board,
  //   boardOrgId: board?.orgId,
  //   userOrgId: authorization.orgId,
  // });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized");
  }

  const userInfo = {
    name: user.firstName || "Teammate",
    picture: user.imageUrl,
  };

  // console.log({ userInfo });

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  // console.log({ status, body }, "Allowed");
  return new Response(body, { status });
}
