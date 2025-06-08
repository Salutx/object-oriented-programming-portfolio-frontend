import Styles from "./ModelsSection.module.scss";
import Image from "next/image";
import { ModelItemProps } from "./ModelsSection.types";

const ModelItem = ({
  data,
  imagePath = "/hb20-model.webp",
}: ModelItemProps) => {
  return (
    <button className={Styles.ModelItem}>
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
  );
};

export default ModelItem;
