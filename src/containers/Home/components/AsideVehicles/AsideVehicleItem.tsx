import Chip from "@/components/Chip";
import { AsideVehicleItemProps } from "./AsideVehicleItem.types";
import Styles from "./AsideVehicles.module.scss";
import clsx from "clsx";
import Tooltip from "@/components/Tooltip";
import Image from "next/image";
import Icon from "@/components/Icon";
import { generateColorFromName } from "@/utils/generateColorFromName";
import { useDeleteVehicle } from "@/queries/Vehicles.queries";
import CreateVehicleModal from "./CreateVehicleModal";
import GenericModal from "@/components/GenericModal/GenericModal";

const statusMap = {
  AVAILABLE: {
    name: "Disponível",
    color: "green",
  },
  SOLD: {
    name: "Vendido",
    color: "red",
  },
  RESERVED: {
    name: "Reservado",
    color: "yellow",
  },
};

const AsideVehicleItem = ({
  imagePath = "/car-placeholder.jpg",
  isSelected,
  onClick,
  data,
  type = "blocks",
  allVehiclesData = [],
}: AsideVehicleItemProps) => {
  const { mutate: deleteVehicleMutate } = useDeleteVehicle();
  const statusConfig = statusMap[data.status] || "gray";

  if (type === "list") {
    return (
      <button
        className={clsx(
          Styles.ContentItem,
          isSelected && Styles.ContentItem__Selected
        )}
        onClick={onClick}
      >
        <Tooltip title={statusConfig.name} placement="left" offset={4}>
          <div className={Styles.ContentItem__Side}>
            <div
              className={Styles.ContentItem__Status}
              style={{ backgroundColor: statusConfig?.color }}
            />
            <p className={Styles.ContentItem_Label}>
              {data?.model?.name} - {data?.year} / Cor:{" "}
              <strong>{data?.color}</strong>
            </p>
          </div>
        </Tooltip>
        <Chip
          label={data?.mark?.name}
          mainColor={generateColorFromName(data?.mark?.name)}
        />
      </button>
    );
  }

  const handleDeleteVehicle = () => {
    const confirmation = confirm(
      "Tem certeza que deseja excluir este veículo? Esta ação não pode ser desfeita."
    );

    if (confirmation) {
      deleteVehicleMutate(data.vehicleId, {
        onSuccess: () => {
          alert("Veículo excluído com sucesso!");
        },
        onError: (error) => {
          alert(`Erro ao excluir veículo: ${error.message}`);
        },
      });
    }
  };

  return (
    <button className={Styles.ContentCard}>
      <div className={Styles.ContentCard__Preview}>
        <div className={Styles.ButtonActions}>
          <div
            className={Styles.ButtonAction}
            onClick={handleDeleteVehicle}
            title="Excluir veículo"
            aria-label="Excluir veículo"
            role="button"
          >
            <Icon name="trash-can-white" />
          </div>

          <GenericModal
            RenderController={({ onClick }) => (
              <div
                className={Styles.ButtonAction}
                onClick={onClick}
                title="Editar veículo"
                aria-label="Editar veículo"
                role="button"
              >
                <Icon name="edit-white" />
              </div>
            )}
          >
            {({ onClose }) => (
              <CreateVehicleModal
                onClose={onClose}
                initialVehicleId={data.vehicleId}
                allVehiclesData={allVehiclesData}
              />
            )}
          </GenericModal>
        </div>

        <Image
          src={imagePath}
          alt="Imagem do veículo"
          unoptimized
          width={100}
          height={100}
          quality={100}
          className={Styles.ContentCard__Image}
        />
      </div>
      <div className={Styles.ContentCard__Informations}>
        <div className={Styles.ContentCard__Top}>
          <h2 className={Styles.ContentCard__Informations_Title}>
            {data?.mark?.name?.toUpperCase()}
            {" " + data?.model?.name?.toUpperCase()}
          </h2>

          <div className={Styles.ContentCard__Informations__Row}>
            <div className={Styles.ContentCard__Informations__Item}>
              <div className={Styles.ContentCard__Informations__ItemIcon}>
                <Icon name="calendar" />
              </div>
              <p className={Styles.ContentCard__Informations_Year}>
                {data?.year}
              </p>
            </div>

            <div className={Styles.ContentCard__Informations__Item}>
              <div className={Styles.ContentCard__Informations__ItemIcon}>
                <Icon name="tachometer" />
              </div>
              <p className={Styles.ContentCard__Informations_Year}>
                {data?.mileage?.toLocaleString("pt-BR")} km
              </p>
            </div>
          </div>

          <div className={Styles.ContentCard__Informations__Side}>
            <div
              className={Styles.ContentItem__Status}
              style={{ backgroundColor: statusConfig?.color }}
            />
            <p className={Styles.ContentCard__Informations_Description}>
              {statusConfig?.name} / Cor: <strong>{data?.color}</strong>
            </p>
          </div>
        </div>

        <div className={Styles.ContentCard__Details}>
          <h2 className={Styles.ContentCard__Details_Price}>
            R${" "}
            {data?.price?.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>

          <div className={Styles.ContentCard__Button} onClick={onClick}>
            <p className={Styles.ContentCard__Button_Label}>
              {data.status === "SOLD" ? "Vendido" : "Ver oferta"}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default AsideVehicleItem;
