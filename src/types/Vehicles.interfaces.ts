import { Mark } from "./Marks.interfaces";
import { Model } from "./Models.interfaces";

export interface Vehicle {
  vehicleId: number;
  year: number;
  color: string;
  price: number;
  mileage: number;
  status: "AVAILABLE" | "SOLD" | "RESERVED";
  mark: Mark;
  model: Model;
}

export interface VehiclePayload {
  year: number;
  color: string;
  price: number;
  mileage: number;
  status: "AVAILABLE" | "SOLD" | "RESERVED";
  markId: number;
  modelId: number;
}

export interface VehicleUpdatePayload {
  vehicleId: number;
  year: number;
  color: string;
  price: number;
  mileage: number;
  status: "AVAILABLE" | "SOLD" | "RESERVED";
  markId: number;
  modelId: number;
}
