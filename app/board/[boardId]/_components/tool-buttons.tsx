"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

const ToolButtons = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <Button
      disabled={isDisabled}
      onClick={onClick}
      size="icon"
      variant={isActive ? "boardActive" : "board"}
    >
      <Icon />
    </Button>
  );
};

export default ToolButtons;
