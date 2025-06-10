import Styles from "./MarksSection.module.scss";
import { CreateMarkModalProps } from "./MarkSection.types";
import { useEffect, useState } from "react";
import {
  useCreateMark,
  useDeleteMark,
  useEditMark,
  useGetAllMarks,
} from "@/queries/Marks.queries";
import BaseModal from "@/components/GenericModal/BaseModal";
import Image from "next/image";
import UniversalInput from "@/components/UniversalInput/UniversalInput";

const CreateMarkModal = ({ onClose, initialMarkId }: CreateMarkModalProps) => {
  const { mutate: createMarkMutate, isPending: isPendingCreate } =
    useCreateMark();
  const { mutate: editMarkMutate, isPending: isPendingEdit } = useEditMark();
  const { data: allMarksData } = useGetAllMarks();
  const { mutate: deleteMark } = useDeleteMark();

  const [markName, setMarkName] = useState<string>("");

  const isEditMode = !!initialMarkId;

  useEffect(() => {
    if (initialMarkId) {
      const initialMark = allMarksData?.find(
        (mark) => mark.markId === initialMarkId
      );

      if (initialMark) {
        setMarkName(initialMark.name);
      }
    }
  }, [allMarksData, initialMarkId]);

  const handleCreateMark = () => {
    if (isEditMode) {
      editMarkMutate(
        {
          markId: initialMarkId,
          name: markName,
        },
        {
          onSuccess: () => {
            setMarkName("");
            alert("Marca editada com sucesso!");
            onClose();
          },
          onError: (error) => {
            console.error("Erro ao editar marca:", error);
            alert("Erro ao editar marca. Tente novamente mais tarde.");
          },
        }
      );

      return;
    }

    createMarkMutate(
      {
        name: markName,
      },
      {
        onSuccess: () => {
          setMarkName("");
          alert("Marca cadastrada com sucesso!");
        },
        onError: (error) => {
          console.error("Erro ao cadastrar marca:", error);
          alert("Erro ao cadastrar marca. Tente novamente mais tarde.");
        },
      }
    );
  };

  const handleDeleteMark = () => {
    if (!initialMarkId) return;

    const confirmation = confirm(
      "Tem certeza que deseja excluir esta marca? Esta ação não pode ser desfeita."
    );

    if (!confirmation) return;

    deleteMark(initialMarkId, {
      onSuccess: () => {
        alert("Marca deletada com sucesso!");
        onClose();
      },
      onError: (error) => {
        console.error("Erro ao deletar marca:", error);
        alert("Erro ao deletar marca. Tente novamente mais tarde.");
      },
    });
  };

  return (
    <BaseModal
      title={isEditMode ? "Atualizar marca" : "Cadastrar marca"}
      onConfirm={handleCreateMark}
      confirmLabel={isEditMode ? "Atualizar marca" : "Cadastrar marca"}
      confirmWidth={130}
      isLoadingConfirm={isPendingCreate || isPendingEdit}
      headerIcon="mark"
      onClose={onClose}
      disableConfirm={!markName.trim()}
      onDelete={handleDeleteMark}
      displayDelete={isEditMode}
    >
      <div className={Styles.MarkForm}>
        <div className={Styles.FormPreview}>
          <Image
            width={120}
            height={20}
            alt="Preview do marca"
            src={"/hyundai.png"}
          />
        </div>

        <div className={Styles.MarkRow}>
          <UniversalInput
            label="Nome da marca"
            placeholder="Digite o nome da marca"
            name="name"
            type="text"
            required
            onChange={(e) => setMarkName(e.target.value)}
            value={markName}
            sx={{ flex: 1 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateMark();
              }
            }}
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default CreateMarkModal;
