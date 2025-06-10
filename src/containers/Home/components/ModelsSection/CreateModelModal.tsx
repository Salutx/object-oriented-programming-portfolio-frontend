import Styles from "./ModelsSection.module.scss";
import { useEffect, useMemo, useState } from "react";
import { CreateModelModalProps } from "./ModelsSection.types";
import { ModelPayload } from "@/types/Models.interfaces";
import { SelectItem } from "@/components/UniversalSelect/UniversalSelect.types";
import {
  useCreateModel,
  useDeleteModel,
  useGetAllModels,
} from "@/queries/Models.queries";
import { useGetAllMarks } from "@/queries/Marks.queries";
import BaseModal from "@/components/GenericModal/BaseModal";
import Image from "next/image";
import UniversalInput from "@/components/UniversalInput/UniversalInput";
import UniversalSelect from "@/components/UniversalSelect";

const CreateModelModal = ({
  onClose,
  initialModelId,
}: CreateModelModalProps) => {
  const { data: allModelsData } = useGetAllModels();
  const { mutate: deleteModelMutate } = useDeleteModel();
  const { data: allMarksData, isPending: isPendingDelete } = useGetAllMarks();
  const { mutate: createModelMutate, isPending: isPendingCreate } =
    useCreateModel();

  const [modelPayload, setModelPayload] = useState<ModelPayload | null>(null);

  const formattedMarksData: SelectItem[] = useMemo(() => {
    if (!allMarksData || allMarksData.length === 0) return [];

    return allMarksData.map(
      (mark) =>
        ({
          id: mark.markId,
          label: mark.name,
          extraData: mark,
        } as SelectItem)
    );
  }, [allMarksData]);

  const isEditMode = !!initialModelId;

  useEffect(() => {
    if (initialModelId && allModelsData) {
      const initialModel = allModelsData.find(
        (model) => model.modelId === initialModelId
      );

      if (initialModel) {
        setModelPayload({
          name: initialModel.name,
          markId: initialModel.mark.markId,
        });
      }
    }
  }, [allModelsData, initialModelId]);

  const selectedMarkData: SelectItem | undefined = useMemo(() => {
    if (!formattedMarksData || formattedMarksData.length === 0)
      return undefined;

    return formattedMarksData.find((mark) => mark.id === modelPayload?.markId);
  }, [formattedMarksData, modelPayload?.markId]);

  const handleCreateModel = () => {
    if (!modelPayload) return;

    createModelMutate(modelPayload, {
      onSuccess: () => {
        setModelPayload(null);
        alert("Modelo cadastrado com sucesso!");
      },
      onError: (error) => {
        console.error("Erro ao cadastrar modelo:", error);
        alert("Erro ao cadastrar modelo. Tente novamente mais tarde.");
      },
    });
  };

  const handleDeleteModel = () => {
    if (!initialModelId) return;

    const confirmation = confirm(
      "Você tem certeza que deseja excluir este modelo? Esta ação não pode ser desfeita."
    );

    if (!confirmation) return;

    deleteModelMutate(initialModelId, {
      onSuccess: () => {
        alert("Modelo excluído com sucesso!");
        onClose();
      },
      onError: (error) => {
        console.error("Erro ao excluir modelo:", error);
        alert("Erro ao excluir modelo. Tente novamente mais tarde.");
      },
    });
  };

  return (
    <BaseModal
      title={isEditMode ? "Editar Modelo" : "Cadastrar Modelo"}
      onConfirm={handleCreateModel}
      isLoadingConfirm={isPendingCreate || isPendingDelete}
      confirmLabel={isEditMode ? "Editar modelo" : "Cadastrar modelo"}
      confirmWidth={130}
      headerIcon="model"
      onClose={onClose}
      displayDelete={isEditMode}
      onDelete={handleDeleteModel}
      disableConfirm={
        !modelPayload || !modelPayload.name || !modelPayload.markId
      }
    >
      <div className={Styles.ModelForm}>
        <div className={Styles.FormPreview}>
          <Image
            width={120}
            height={100}
            alt="Preview do veículo"
            src={"/hb20-model.webp"}
          />
        </div>

        <div className={Styles.ModelRow}>
          <UniversalInput
            label="Nome do modelo"
            placeholder="Digite o nome do modelo"
            name="name"
            type="text"
            required
            onChange={(e) =>
              setModelPayload((prev) => ({
                ...prev!,
                name: e.target.value,
              }))
            }
            value={modelPayload?.name || ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateModel();
              }
            }}
          />

          <UniversalSelect
            title="Marca"
            selectedItem={selectedMarkData}
            itemsData={formattedMarksData}
            onSelect={(item) => {
              setModelPayload((prev) => ({
                ...prev!,
                markId: (item as SelectItem).id as number,
              }));
            }}
            label={selectedMarkData?.label || "Selecione uma marca"}
            sx={{ wrapper: { flex: 1 }, button: { width: "100%" } }}
            required
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default CreateModelModal;
