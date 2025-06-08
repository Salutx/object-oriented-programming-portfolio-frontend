import VehiclesApi from "@/api/VehiclesApi";
import { Model, ModelUpdatePayload } from "@/types/Models.interfaces";

export default async function updateModel(
  payload: ModelUpdatePayload
): Promise<Model> {
  try {
    const response = await VehiclesApi.put<Model>(
      `/models/update/${payload.modelId}`,
      payload
    );
    if (response.status !== 200) {
      throw new Error("Failed to edit model");
    }
    return response.data;
  } catch (error) {
    console.error("Error editing model:", error);
    throw new Error("Error editing model");
  }
}
