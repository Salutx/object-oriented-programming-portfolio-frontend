import Styles from "./MarksSection.module.scss";
import { MarkItemProps } from "./MarkSection.types";
import Image from "next/image";
import GenericModal from "@/components/GenericModal/GenericModal";
import CreateMarkModal from "./CreateMarkModal";

const MarkItem = ({ data, imagePath = "/hyundai.png" }: MarkItemProps) => {
  return (
    <GenericModal
      RenderController={({ onClick }) => (
        <button className={Styles.MarkItem} onClick={onClick}>
          <div className={Styles.MarkItem__Preview}>
            <Image
              src={imagePath}
              alt="Imagem da Marca"
              width={100}
              height={15}
              className={Styles.MarkItem__Preview__Image}
              quality={100}
              unoptimized
            />
          </div>
          <div className={Styles.MarkItem__Footer}>
            <p className={Styles.MarkItem__Footer_Text}>{data.name}</p>
          </div>
        </button>
      )}
    >
      {({ onClose }) => (
        <CreateMarkModal onClose={onClose} initialMarkId={data.markId} />
      )}
    </GenericModal>
  );
};

export default MarkItem;
