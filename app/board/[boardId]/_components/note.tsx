import { cn, colorToCss, getContrastingText } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { NoteLayer } from "@/types/canvas";
import { Kalam } from "next/font/google";

import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

const font = Kalam({ subsets: ["latin"], weight: ["400"] });

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.25;
  const fontSizeBaseOnHeight = height * scaleFactor;
  const fontSizeBaseOnHWidth = width * scaleFactor;

  return Math.min(fontSizeBaseOnHWidth, fontSizeBaseOnHeight, maxFontSize);
};

const Note = ({ layer, id, onPointerDown, selectionColor }: NoteProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);
  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };
  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? colorToCss(fill) : "#000",
      }}
      className="drop-shadow-xl shadow-md "
    >
      <ContentEditable
        html={value || "Text"}
        className={cn(
          "h-full w-full justify-center items-center flex text-center",
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? getContrastingText(fill) : "#000",
        }}
        onChange={handleContentChange}
      />
    </foreignObject>
  );
};

export default Note;
