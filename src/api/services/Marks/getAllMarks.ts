import VehiclesApi from "@/api/VehiclesApi";
import { Mark } from "@/types/Marks.interfaces";

export default async function getAllMarks(): Promise<Mark[]> {
  try {
    const response = await VehiclesApi.get<Mark[]>("/marks");
    if (response.status !== 200) {
      throw new Error("Failed to fetch marks");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching marks:", error);
    throw new Error("Error fetching marks");
  }
}
