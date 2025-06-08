import VehiclesApi from "@/api/VehiclesApi";
import { Mark, MarkPayload } from "@/types/Marks.interfaces";

export default async function createMark(payload: MarkPayload): Promise<Mark> {
  try {
    const response = await VehiclesApi.post<Mark>("/marks/create", payload);
    if (response.status !== 200) {
      throw new Error("Failed to create mark");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating mark:", error);
    throw new Error("Error creating mark");
  }
}
