import Styles from "./ModelsSection.module.scss";
import Image from "next/image";
import { ModelItemProps } from "./ModelsSection.types";
import GenericModal from "@/components/GenericModal/GenericModal";
import CreateModelModal from "./CreateModelModal";

const ModelItem = ({
  data,
  imagePath = "/hb20-model.webp",
}: ModelItemProps) => {
  return (
    <GenericModal
      RenderController={({ onClick }) => (
        <button className={Styles.ModelItem} onClick={() => onClick()}>
          <div className={Styles.ModelItem__Preview}>
            <Image
              src={imagePath}
              alt="Imagem do Modelo"
              width={100}
              height={70}
              className={Styles.ModelItem__Preview__Image}
              quality={100}
              unoptimized
            />
          </div>
          <div className={Styles.ModelItem__Footer}>
            <p className={Styles.ModelItem__Footer_Text}>{data.name}</p>
          </div>
        </button>
      )}
    >
      {({ onClose }) => (
        <CreateModelModal onClose={onClose} initialModelId={data.modelId} />
      )}
    </GenericModal>
  );
};

export default ModelItem;
