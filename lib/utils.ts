import {
  Camera,
  Color,
  Layer,
  LayerType,
  PathLayer,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = ["#dc2626", "#d97706", "#db2777", "#7c3aed", "#059669"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function resizeBound(bound: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bound.x,
    y: bound.y,
    width: bound.width,
    height: bound.height,
  };

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bound.x + bound.width);
    result.width = Math.abs(bound.x + bound.width - point.x);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bound.x);
    result.width = Math.abs(point.x - bound.x);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bound.y + bound.height);
    result.height = Math.abs(bound.y + bound.height - point.y);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.y = Math.min(point.y, bound.y);
    result.height = Math.abs(point.y - bound.y);
  }

  return result;
}

export function findIntersectingLayerWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point
) {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids = [];

  for (const layerId of layerIds) {
    const layer = layers.get(layerId);
    if (layer == null) {
      continue;
    }
    const { x, y, height, width } = layer;
    if (
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height
    ) {
      ids.push(layerId);
    }
  }
  return ids;
}

export function getContrastingText(color: Color) {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.144 * color.b;
  return luminance > 182 ? "black" : "white";
}

export function penPointToPathLayer(
  points: number[][],
  color: Color
): PathLayer {
  if (points.length < 2) {
    throw new Error("less then 2 points");
  }

  let left = Number.POSITIVE_INFINITY;
  let right = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let botton = Number.POSITIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;
    if (left > x) {
      left = x;
    }
    if (top > y) {
      top = y;
    }
    if (right < x) {
      right = x;
    }
    if (botton < y) {
      botton = y;
    }
  }
  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: botton - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
}

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";
  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );
  d.push("Z");
  return d.join(" ");
}
