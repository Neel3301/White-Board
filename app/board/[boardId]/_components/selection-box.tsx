"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bound";
import { useSelf, useStorage } from "@/liveblocks.config";
import { LayerType, Side, XYWH } from "@/types/canvas";
import { memo } from "react";

interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBound: XYWH) => void;
}

const HANDLE_WIDTH = 8;

const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    const isShowinghandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    );

    const bound = useSelectionBounds();

    if (!bound) {
      return null;
    }
    return (
      <>
        <rect
          className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none "
          style={{
            transform: `translateX(${bound.x}px) translateY(${bound.y}px)`,
          }}
          x={0}
          y={0}
          width={bound.width}
          height={bound.height}
        />
        {isShowinghandles && (
          <>
            <rect
              className="fill-white stroke-1 stroke-blue-500 "
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translateX(${bound.x - HANDLE_WIDTH / 2}px) translateY(${bound.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top + Side.Left, bound);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 "
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translateX(${bound.x + bound.width / 2 - HANDLE_WIDTH / 2}px) translateY(${bound.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top, bound);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 "
              x={0}
              y={0}
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translateX(${bound.x - HANDLE_WIDTH / 2 + bound.width}px) translateY(${bound.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top + Side.Right, bound);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 "
              x={0}
              y={0}
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translateX(${bound.x - HANDLE_WIDTH / 2 + bound.width}px) translateY(${bound.y + bound.height / 2 - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Right, bound);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 "
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translateX(${bound.x - HANDLE_WIDTH / 2 + bound.width}px) translateY(${bound.y + bound.height - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom + Side.Right, bound);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 "
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translateX(${bound.x - HANDLE_WIDTH / 2 + bound.width / 2}px) translateY(${bound.y + bound.height - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom, bound);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 "
              x={0}
              y={0}
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translateX(${bound.x - HANDLE_WIDTH / 2}px) translateY(${bound.y + bound.height - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom + Side.Left, bound);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 "
              x={0}
              y={0}
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translateX(${bound.x - HANDLE_WIDTH / 2}px) translateY(${bound.y + bound.height / 2 - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Left, bound);
              }}
            />
          </>
        )}
      </>
    );
  }
);

SelectionBox.displayName = "SelectionBox";

export default SelectionBox;
