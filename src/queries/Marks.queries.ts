import createMark from "@/api/services/Marks/createMark";
import deleteMark from "@/api/services/Marks/deleteMark";
import getAllMarks from "@/api/services/Marks/getAllMarks";
import updateMark from "@/api/services/Marks/updateMark";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllMarks = () =>
  useQuery({
    queryKey: ["marks"],
    queryFn: getAllMarks,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

export const useEditMark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMark,
    mutationKey: ["marks", "editMark"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["marks"] });
    },
  });
};

export const useCreateMark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMark,
    mutationKey: ["marks", "createMark"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marks"] });
    },
  });
};

export const useDeleteMark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMark,
    mutationKey: ["marks", "deleteMark"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marks"] });
    },
  });
};
