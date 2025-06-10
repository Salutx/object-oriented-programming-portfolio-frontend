import createVehicle from "@/api/services/Vehicles/createVehicle";
import deleteVehicle from "@/api/services/Vehicles/deleteVehicle";
import getAllVehicles from "@/api/services/Vehicles/getAllVehicles";
import updateVehicle from "@/api/services/Vehicles/updateVehicle";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllVehicles = (searchTerm?: string) =>
  useQuery({
    queryKey: ["vehicles", searchTerm],
    queryFn: () => getAllVehicles({ searchTerm }),
  });

export const useEditVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVehicle,
    mutationKey: ["vehicles", "editVehicle"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["marks"] });
    },
  });
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVehicle,
    mutationKey: ["vehicles", "createVehicle"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
};

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVehicle,
    mutationKey: ["vehicles", "deleteVehicle"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
};
