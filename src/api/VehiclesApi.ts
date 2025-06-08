import axios from "axios";

const VehiclesApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_LIBRARY_SERVICE_URL}/api/`,
  timeout: 60000 * 3,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default VehiclesApi;
