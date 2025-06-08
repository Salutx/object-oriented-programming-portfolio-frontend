import { Model } from "@/types/Models.interfaces";

export interface ModelsSectionProps {}

export interface ModelItemProps {
  data: Model;
  imagePath?: string;
}

export interface CreateModelModalProps {
  onClose: () => void;
  initialModelId?: number;
}
