import Hint from "@/app/(dashboard)/_components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface UserAvatarProps {
  src?: string;
  borderColor?: string;
  fallback?: string;
  name?: string;
}

const UserAvatar = ({ src, fallback, borderColor, name }: UserAvatarProps) => {
  return (
    <div>
      <Hint
        label={name || "Teammate"}
        side="bottom"
        sideOffset={18}
        align="center"
      >
        <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
          <AvatarImage src={src} />
          <AvatarFallback className="text-xs font-semibold">
            {fallback}
          </AvatarFallback>
        </Avatar>
      </Hint>
    </div>
  );
};

export default UserAvatar;
