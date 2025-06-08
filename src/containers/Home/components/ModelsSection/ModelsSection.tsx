"use client";

import Styles from "./ModelsSection.module.scss";
import Section from "../Section.module.scss";
import Icon from "@/components/Icon";
import clsx from "clsx";
import Chip from "@/components/Chip";
import ModelItem from "./ModelItem";
import Button from "@/components/Button";
import GenericModal from "@/components/GenericModal/GenericModal";
import BaseModal from "@/components/GenericModal/BaseModal";
import UniversalInput from "@/components/UniversalInput/UniversalInput";
import UniversalSelect from "@/components/UniversalSelect";
import Image from "next/image";
import getCounterFromArray from "@/utils/getCounterFromArray";
import { useCreateModel, useGetAllModels } from "@/queries/Models.queries";
import { useGetAllMarks } from "@/queries/Marks.queries";
import EmptyException from "@/components/EmptyException/EmptyException";
import { SelectItem } from "@/components/UniversalSelect/UniversalSelect.types";
import { useMemo, useState } from "react";
import { ModelPayload } from "@/types/Models.interfaces";
import CreateModelModal from "./CreateModelModal";

const ModelsSection = () => {
  const { data: allModelsData } = useGetAllModels();

  const hasData = allModelsData && allModelsData.length > 0;
  const dataCounter = getCounterFromArray(allModelsData);

  return (
    <div className={clsx(Section.Wrapper, Styles.Models)}>
      <div className={Section.Header}>
        <div className={Section.HeaderSide}>
          <Icon name="model" />
          <p className={Section.HeaderSide_Title}>Modelos</p>
        </div>

        <div className={Section.HeaderSide}>
          <GenericModal
            RenderController={({ onClick }) => (
              <Button
                leftIcon="add"
                label="Cadastrar modelo"
                onClick={onClick}
              />
            )}
          >
            {({ onClose }) => <CreateModelModal onClose={onClose} />}
          </GenericModal>

          <Chip label={dataCounter} />
        </div>
      </div>

      <div
        className={Styles.ContentScroll}
        style={{
          scrollbarGutter: hasData ? "stable" : "auto",
        }}
      >
        {hasData && (
          <div className={Styles.Content}>
            {allModelsData?.map((model, index) => (
              <ModelItem data={model} key={index} />
            ))}
          </div>
        )}

        {!hasData && (
          <div style={{ width: "100%", height: "100%" }}>
            <EmptyException
              title="Nenhum modelo cadastrado"
              description="Você ainda não cadastrou nenhuma modelo. Clique no botão acima para cadastrar uma modelo."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelsSection;
