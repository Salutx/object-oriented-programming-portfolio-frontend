import VehiclesApi from "@/api/VehiclesApi";

export default async function deleteVehicle(vehicleId: number): Promise<void> {
  try {
    const response = await VehiclesApi.delete(`/vehicles/${vehicleId}`);
    if (response.status !== 204) {
      throw new Error("Failed to delete vehicle");
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw new Error("Error deleting vehicle");
  }
}
