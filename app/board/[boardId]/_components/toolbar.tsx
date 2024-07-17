import {
  Circle,
  EllipsisIcon,
  MousePointer,
  MousePointer2,
  Pencil,
  Redo,
  Square,
  StickyNote,
  Type,
  Undo,
} from "lucide-react";
import ToolButtons from "./tool-buttons";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

interface TolbarProps {
  cenvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const Toolbar = ({
  canRedo,
  canUndo,
  cenvasState,
  setCanvasState,
  undo,
  redo,
}: TolbarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 ">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButtons
          label="Select"
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            cenvasState.mode === CanvasMode.None ||
            cenvasState.mode === CanvasMode.Translating ||
            cenvasState.mode === CanvasMode.SelectionNet ||
            cenvasState.mode === CanvasMode.Pressing ||
            cenvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButtons
          label="Text"
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isActive={
            cenvasState.mode === CanvasMode.Inserting &&
            cenvasState.layerType === LayerType.Text
          }
        />
        <ToolButtons
          label="Sticky Note"
          icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          isActive={
            cenvasState.mode === CanvasMode.Inserting &&
            cenvasState.layerType === LayerType.Note
          }
        />{" "}
        <ToolButtons
          label="Rectangle"
          icon={Square}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          isActive={
            cenvasState.mode === CanvasMode.Inserting &&
            cenvasState.layerType === LayerType.Rectangle
          }
        />
        <ToolButtons
          label="Ellipse"
          icon={Circle}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          isActive={
            cenvasState.mode === CanvasMode.Inserting &&
            cenvasState.layerType === LayerType.Ellipse
          }
        />
        <ToolButtons
          label="Pen"
          icon={Pencil}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
          isActive={cenvasState.mode === CanvasMode.Pencil}
        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md ">
        <ToolButtons
          label="Undo"
          icon={Undo}
          onClick={undo}
          isActive={false}
          isDisabled={!canUndo}
        />{" "}
        <ToolButtons
          label="Redo"
          icon={Redo}
          onClick={redo}
          isActive={false}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};

export default Toolbar;
