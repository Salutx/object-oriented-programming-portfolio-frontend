import VehiclesApi from "@/api/VehiclesApi";
import { Vehicle, VehicleUpdatePayload } from "@/types/Vehicles.interfaces";

export default async function updateVehicle(
  payload: VehicleUpdatePayload
): Promise<Vehicle> {
  try {
    const response = await VehiclesApi.put<Vehicle>(
      `/vehicles/update/${payload.vehicleId}`,
      payload
    );
    if (response.status !== 200) {
      throw new Error("Failed to edit vehicle");
    }
    return response.data;
  } catch (error) {
    console.error("Error editing vehicle:", error);
    throw new Error("Error editing vehicle");
  }
}
