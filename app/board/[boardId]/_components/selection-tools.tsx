"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bound";

import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import ColorPicker from "./color-picker";
import { useMutation, useSelf } from "@/liveblocks.config";
import { useDeleteLayers } from "@/hooks/use-delete-layer";
import { Button } from "@/components/ui/button";
import { LucideSendToBack, SendToBack, Trash2 } from "lucide-react";
import Hint from "@/app/(dashboard)/_components/hint";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);
    const selectionBounds = useSelectionBounds();

    const deleteLayers = useDeleteLayers();

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];
        const arr = liveLayerIds.toArray();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayerIds.move(indices[i], i);
        }
      },
      [selection]
    );
    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];
        const arr = liveLayerIds.toArray();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayerIds.move(
            indices[i],
            arr.length - 1 - (indices.length - 1 - i)
          );
        }
      },
      [selection]
    );
    if (!selectionBounds) {
      return null;
    }
    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-md border flex selected-none"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
        }}
      >
        <ColorPicker onChange={setFill} />
        <div className="flex flex-col gap-y-0.5">
          <Button variant={"board"} size={"icon"} onClick={moveToBack}>
            <Hint label={"Back"} side="right" sideOffset={18} align="start">
              <SendToBack />
            </Hint>
          </Button>
          <Button variant={"board"} size={"icon"} onClick={moveToFront}>
            <Hint label={"Front"} side="right" sideOffset={18} align="start">
              <LucideSendToBack />
            </Hint>
          </Button>
        </div>
        <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
          <Button variant={"board"} size={"icon"} onClick={deleteLayers}>
            <Trash2 />
          </Button>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "Selection Tools";
export default SelectionTools;
