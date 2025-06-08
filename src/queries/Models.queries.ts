import createModel from "@/api/services/Models/createModel";
import deleteModel from "@/api/services/Models/deleteModel";
import getAllModels from "@/api/services/Models/getAllModels";
import updateModel from "@/api/services/Models/updateModel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllModels = () =>
  useQuery({
    queryKey: ["models"],
    queryFn: getAllModels,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

export const useEditModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateModel,
    mutationKey: ["models", "editModel"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};

export const useCreateModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createModel,
    mutationKey: ["models", "createModel"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};

export const useDeleteModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteModel,
    mutationKey: ["models", "deleteModel"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};
