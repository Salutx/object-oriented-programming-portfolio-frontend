import VehiclesApi from "@/api/VehiclesApi";

export default async function deleteMark(markId: number): Promise<void> {
  try {
    const response = await VehiclesApi.delete(`/marks/delete/${markId}`);
    if (response.status !== 200) {
      throw new Error("Failed to delete mark");
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting mark:", error);
    throw new Error("Error deleting mark");
  }
}
