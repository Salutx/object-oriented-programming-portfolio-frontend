import VehiclesApi from "@/api/VehiclesApi";
import { Vehicle, VehiclePayload } from "@/types/Vehicles.interfaces";

export default async function createVehicle(
  payload: VehiclePayload
): Promise<Vehicle> {
  try {
    const response = await VehiclesApi.post<Vehicle>("/vehicles/create", {
      ...payload,
      status: "AVAILABLE",
    });
    if (response.status !== 200) {
      throw new Error("Failed to create vehicle");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw new Error("Error creating vehicle");
  }
}
