"use client";

import { useOthers, useSelf } from "@/liveblocks.config";
import UserAvatar from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USER = 1;
const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUser = users.length > MAX_SHOWN_USER;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {currentUser && (
          <UserAvatar
            // src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={`${currentUser.info?.name?.[0] || "Y"}`}
          />
        )}
        {users.slice(0, MAX_SHOWN_USER).map(({ connectionId, info }) => (
          <UserAvatar
            borderColor={connectionIdToColor(connectionId)}
            key={connectionId}
            // src={info?.picture}
            name={info?.name}
            fallback={info?.name?.[0] || "T"}
          />
        ))}

        {hasMoreUser && (
          <UserAvatar
            // src={currentUser.info?.picture}
            name={`${users.length - MAX_SHOWN_USER} more`}
            fallback={`+${users.length - MAX_SHOWN_USER}`}
          />
        )}
      </div>
    </div>
  );
};

export default Participants;
