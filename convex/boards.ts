import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favourite: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("unauthorize");
    }

    const title = args.search as string;
    let boards = [];
    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    if (args.favourite) {
      const favouriteBoards = await ctx.db
        .query("userFavourites")
        .withIndex("by_user_org", (q) =>
          q.eq("orgId", args.orgId).eq("userId", identity.subject)
        )
        .order("desc")
        .collect();

      const ids = favouriteBoards.map((b) => b.boardId);

      const boards = await getAllOrThrow(ctx.db, ids);
      return boards.map((b) => ({
        ...b,
        isFavourite: true,
      }));
    }

    const boardsWithFavouriteRelations = boards.map((board) => {
      return ctx.db
        .query("userFavourites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((fav) => {
          return {
            ...board,
            isFavourite: !!fav,
          };
        });
    });

    const boardsWithFavouriteBoolean = Promise.all(
      boardsWithFavouriteRelations
    );
    return boardsWithFavouriteBoolean;
  },
});

// 4.14
