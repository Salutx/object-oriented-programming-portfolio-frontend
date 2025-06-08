import VehiclesApi from "@/api/VehiclesApi";
import { Vehicle } from "@/types/Vehicles.interfaces";

export default async function getAllVehicles({
  searchTerm,
}: {
  searchTerm?: string;
}): Promise<Vehicle[]> {
  try {
    const response = await VehiclesApi.get<Vehicle[]>("/vehicles", {
      params: {
        search: searchTerm || "",
      },
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch vehicles");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw new Error("Error fetching vehicles");
  }
}
