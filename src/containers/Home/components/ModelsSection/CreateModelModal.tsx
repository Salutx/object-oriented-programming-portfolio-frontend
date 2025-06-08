import Styles from "./ModelsSection.module.scss";
import { useMemo, useState } from "react";
import { CreateModelModalProps } from "./ModelsSection.types";
import { ModelPayload } from "@/types/Models.interfaces";
import { SelectItem } from "@/components/UniversalSelect/UniversalSelect.types";
import { useCreateModel } from "@/queries/Models.queries";
import { useGetAllMarks } from "@/queries/Marks.queries";
import BaseModal from "@/components/GenericModal/BaseModal";
import Image from "next/image";
import UniversalInput from "@/components/UniversalInput/UniversalInput";
import UniversalSelect from "@/components/UniversalSelect";

const CreateModelModal = ({
  onClose,
  initialModelId,
}: CreateModelModalProps) => {
  const { data: allMarksData } = useGetAllMarks();
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

  return (
    <BaseModal
      title="Cadastrar modelo"
      onConfirm={handleCreateModel}
      isLoadingConfirm={isPendingCreate}
      confirmLabel="Cadastrar modelo"
      confirmWidth={130}
      headerIcon="model"
      onClose={onClose}
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
