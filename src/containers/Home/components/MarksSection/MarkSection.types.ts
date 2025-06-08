import { Mark } from "@/types/Marks.interfaces";

export interface MarkItemProps {
  data: Mark;
  imagePath?: string;
}

export interface CreateMarkModalProps {
  onClose: () => void;
  initialMarkId?: number;
}
