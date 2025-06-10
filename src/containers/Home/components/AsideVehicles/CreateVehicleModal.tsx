import { useGetAllMarks } from "@/queries/Marks.queries";
import { CreateVehicleModalProps } from "./AsideVehicleItem.types";
import Styles from "./AsideVehicles.module.scss";
import { useGetAllModels } from "@/queries/Models.queries";
import { useCreateVehicle, useEditVehicle } from "@/queries/Vehicles.queries";
import { useEffect, useMemo, useState } from "react";
import { VehiclePayload } from "@/types/Vehicles.interfaces";
import { SelectItem } from "@/components/UniversalSelect/UniversalSelect.types";
import BaseModal from "@/components/GenericModal/BaseModal";
import Image from "next/image";
import UniversalSelect from "@/components/UniversalSelect";
import UniversalInput from "@/components/UniversalInput/UniversalInput";

const STATUS_OPTIONS: SelectItem[] = [
  {
    id: "AVAILABLE",
    label: "Disponível",
    icon: (
      <div className={Styles.StatusMark} style={{ backgroundColor: "green" }} />
    ),
  },
  {
    id: "SOLD",
    label: "Vendido",
    icon: (
      <div className={Styles.StatusMark} style={{ backgroundColor: "red" }} />
    ),
  },
  {
    id: "RESERVED",
    label: "Reservado",
    icon: (
      <div
        className={Styles.StatusMark}
        style={{ backgroundColor: "yellow" }}
      />
    ),
  },
];

const CreateVehicleModal = ({
  onClose,
  initialVehicleId,
  allVehiclesData,
}: CreateVehicleModalProps) => {
  const { data: allMarksData } = useGetAllMarks();
  const { data: allModelsData } = useGetAllModels();

  const { mutate: createVehicleMutate, isPending: isPendingCreate } =
    useCreateVehicle();

  const { mutate: editVehicleMutate, isPending: isPendingEdit } =
    useEditVehicle();

  const [vehiclePayload, setVehiclePayload] = useState<VehiclePayload | null>(
    null
  );

  const isEditMode = !!initialVehicleId;

  useEffect(() => {
    if (initialVehicleId) {
      const initialVehicle = allVehiclesData?.find(
        (vehicle) => vehicle.vehicleId === initialVehicleId
      );

      if (initialVehicle) {
        setVehiclePayload({
          markId: initialVehicle.mark.markId,
          modelId: initialVehicle.model.modelId,
          year: initialVehicle.year,
          color: initialVehicle.color,
          price: initialVehicle.price,
          mileage: initialVehicle.mileage,
          status: initialVehicle.status,
        });
      }
    }
  }, [allVehiclesData, initialVehicleId]);

  // Format marks data for the select component
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

  // Filter models based on selected mark
  const selectedMarkData: SelectItem | undefined = useMemo(() => {
    if (!formattedMarksData || formattedMarksData.length === 0)
      return undefined;

    return formattedMarksData.find(
      (mark) => mark.id === vehiclePayload?.markId
    );
  }, [formattedMarksData, vehiclePayload?.markId]);

  // Find the selected model based on vehiclePayload
  const formattedModelsData: SelectItem[] = useMemo(() => {
    if (!allModelsData || allModelsData.length === 0) return [];

    const filteredModelsData = allModelsData.filter(
      (model) => model.mark.markId === vehiclePayload?.markId
    );

    return filteredModelsData.map(
      (model) =>
        ({
          id: model.modelId,
          label: model.name,
          extraData: model,
        } as SelectItem)
    );
  }, [allModelsData, vehiclePayload?.markId]);

  // Selected model based on vehiclePayload
  const selectedModelData: SelectItem | undefined = useMemo(() => {
    if (!formattedModelsData || formattedModelsData.length === 0)
      return undefined;

    return formattedModelsData.find(
      (model) => model.id === vehiclePayload?.modelId
    );
  }, [formattedModelsData, vehiclePayload?.modelId]);

  // Handle vehicle creation or update
  const handleCreateVehicle = () => {
    if (vehiclePayload) {
      if (isEditMode) {
        editVehicleMutate(
          {
            vehicleId: initialVehicleId,
            ...vehiclePayload,
          },
          {
            onSuccess: () => {
              setVehiclePayload(null);
              alert("Veículo atualizado com sucesso!");
              onClose();
            },
            onError: (error) => {
              console.error("Error updating vehicle:", error);
              alert("Erro ao atualizar veículo. Tente novamente mais tarde.");
            },
          }
        );

        return;
      }

      createVehicleMutate(vehiclePayload, {
        onSuccess: () => {
          setVehiclePayload(null);
          alert("Veículo criado com sucesso!");
        },
        onError: (error) => {
          console.error("Error creating vehicle:", error);
          alert("Erro ao criar veículo. Tente novamente mais tarde.");
        },
      });
    }
  };

  return (
    <BaseModal
      title={isPendingEdit ? "Atualizar veículo" : "Cadastrar veículo"}
      headerIcon="vehicle"
      confirmLabel={isEditMode ? "Atualizar veículo" : "Cadastrar veículo"}
      confirmWidth={120}
      onClose={onClose}
      onConfirm={handleCreateVehicle}
      isLoadingConfirm={isPendingCreate || isPendingEdit}
      disableConfirm={
        !vehiclePayload?.markId ||
        !vehiclePayload?.modelId ||
        !vehiclePayload?.year ||
        !vehiclePayload?.color ||
        !vehiclePayload?.price ||
        !vehiclePayload?.mileage
      }
    >
      <div className={Styles.AddVehicle}>
        <div className={Styles.FormPreview}>
          <Image
            width={120}
            height={100}
            alt="Preview do veículo"
            src={"/hb20-model.webp"}
          />
        </div>

        <div className={Styles.VehicleForm}>
          <div className={Styles.VehicleRow}>
            <UniversalSelect
              title="Marca"
              onSelect={(item) => {
                setVehiclePayload((prev) => ({
                  ...prev!,
                  markId: (item as SelectItem).id as number,
                }));
              }}
              label={selectedMarkData?.label || "Selecione uma marca"}
              sx={{ wrapper: { flex: 1 }, button: { width: "100%" } }}
              selectedItem={selectedMarkData}
              itemsData={formattedMarksData}
              required
            />
            <UniversalSelect
              title="Modelo"
              onSelect={(item) => {
                setVehiclePayload((prev) => ({
                  ...prev!,
                  modelId: (item as SelectItem).id as number,
                }));
              }}
              label={selectedModelData?.label || "Selecione um modelo"}
              sx={{ wrapper: { flex: 1 }, button: { width: "100%" } }}
              selectedItem={selectedModelData}
              itemsData={formattedModelsData}
              disabled={!selectedMarkData}
              required
            />
          </div>
          <div className={Styles.VehicleRow}>
            <UniversalInput
              label="Ano"
              onChange={(e) => {
                setVehiclePayload((prev) => ({
                  ...prev!,
                  year: +e.target.value,
                }));
              }}
              placeholder="Ex: 2022"
              type="number"
              value={vehiclePayload?.year || ""}
              required
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateVehicle();
                }
              }}
            />
            <UniversalInput
              label="Cor"
              onChange={(e) => {
                setVehiclePayload((prev) => ({
                  ...prev!,
                  color: e.target.value,
                }));
              }}
              placeholder="Ex: Cinza"
              type="text"
              value={vehiclePayload?.color || ""}
              required
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateVehicle();
                }
              }}
            />
          </div>
          <div className={Styles.VehicleRow}>
            <UniversalInput
              label="Preço"
              onChange={(e) => {
                setVehiclePayload((prev) => ({
                  ...prev!,
                  price: parseFloat(e.target.value.replace(/[^0-9.-]+/g, "")),
                }));
              }}
              placeholder="Ex: R$ 60.000,00"
              type="number"
              value={vehiclePayload?.price || ""}
              required
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateVehicle();
                }
              }}
            />
            <UniversalInput
              label="Quilometragem"
              onChange={(e) => {
                setVehiclePayload((prev) => ({
                  ...prev!,
                  mileage: parseFloat(e.target.value.replace(/[^0-9.-]+/g, "")),
                }));
              }}
              placeholder="Ex: 10.000"
              type="text"
              value={vehiclePayload?.mileage || ""}
              required
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateVehicle();
                }
              }}
            />
          </div>

          {isEditMode && (
            <div className={Styles.VehicleRow}>
              <UniversalSelect
                title="Status"
                onSelect={(item) => {
                  setVehiclePayload((prev) => ({
                    ...prev!,
                    status: (item as SelectItem).id as
                      | "AVAILABLE"
                      | "SOLD"
                      | "RESERVED",
                  }));
                }}
                label={
                  vehiclePayload?.status
                    ? STATUS_OPTIONS.find(
                        (option) => option.id === vehiclePayload.status
                      )?.label || "Selecione um status"
                    : "Selecione um status"
                }
                sx={{ wrapper: { flex: 1 }, button: { width: "100%" } }}
                selectedItem={
                  STATUS_OPTIONS.find(
                    (option) => option.id === vehiclePayload?.status
                  ) || undefined
                }
                itemsData={STATUS_OPTIONS}
                required
              />
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default CreateVehicleModal;
