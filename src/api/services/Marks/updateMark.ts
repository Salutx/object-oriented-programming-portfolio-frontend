import VehiclesApi from "@/api/VehiclesApi";
import { Mark, MarkUpdatePayload } from "@/types/Marks.interfaces";

export default async function updateMark(
  payload: MarkUpdatePayload
): Promise<Mark> {
  try {
    const response = await VehiclesApi.put<Mark>(
      `/marks/update/${payload.markId}`,
      payload
    );
    if (response.status !== 200) {
      throw new Error("Failed to edit mark");
    }
    return response.data;
  } catch (error) {
    console.error("Error editing mark:", error);
    throw new Error("Error editing mark");
  }
}
