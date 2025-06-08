import Styles from "./MarksSection.module.scss";
import { MarkItemProps } from "./MarkSection.types";
import Image from "next/image";

const MarkItem = ({ data, imagePath = "/hyundai.png" }: MarkItemProps) => {
  return (
    <button className={Styles.MarkItem}>
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
  );
};

export default MarkItem;
