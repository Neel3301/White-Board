import { title } from "process";
import { create } from "zustand";

const defaultValue = { id: "", title: "" };

interface IRenameModel {
  isOpen: boolean;
  initialValue: typeof defaultValue;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameModel = create<IRenameModel>((set) => ({
  isOpen: false,
  onOpen: (id, title) =>
    set({
      isOpen: true,
      initialValue: { id, title },
    }),
  onClose: () =>
    set({
      isOpen: false,
      initialValue: defaultValue,
    }),
  initialValue: defaultValue,
}));
