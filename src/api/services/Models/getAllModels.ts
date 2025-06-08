import VehiclesApi from "@/api/VehiclesApi";
import { Model } from "@/types/Models.interfaces";

export default async function getAllModels(): Promise<Model[]> {
  try {
    const response = await VehiclesApi.get<Model[]>("/models");
    if (response.status !== 200) {
      throw new Error("Failed to fetch models");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching models:", error);
    throw new Error("Error fetching models");
  }
}
