import VehiclesApi from "@/api/VehiclesApi";
import { Model, ModelPayload } from "@/types/Models.interfaces";

export default async function createModel(
  payload: ModelPayload
): Promise<Model> {
  try {
    const response = await VehiclesApi.post<Model>("/models/create", payload);
    if (response.status !== 200) {
      throw new Error("Failed to create model");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating model:", error);
    throw new Error("Error creating model");
  }
}
