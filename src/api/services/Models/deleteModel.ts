import VehiclesApi from "@/api/VehiclesApi";

export default async function deleteModel(modelId: number): Promise<void> {
  try {
    const response = await VehiclesApi.delete(`/models/${modelId}`);
    if (response.status !== 204) {
      throw new Error("Failed to delete model");
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting model:", error);
    throw new Error("Error deleting model");
  }
}
