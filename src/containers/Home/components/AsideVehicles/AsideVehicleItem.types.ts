import { Vehicle } from "@/types/Vehicles.interfaces";

export type ViewMode = "blocks" | "list";

export interface AsideVehicleItemProps {
  data: Vehicle;
  isSelected?: boolean;
  onClick?: VoidFunction;
  type: ViewMode;
  imagePath?: string;
  allVehiclesData?: Vehicle[];
}

export interface CreateVehicleModalProps {
  onClose: VoidFunction;
  initialVehicleId?: number;
  allVehiclesData?: Vehicle[];
}
