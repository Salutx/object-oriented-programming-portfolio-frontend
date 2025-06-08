"use client";

import Styles from "./MarksSection.module.scss";
import Section from "../Section.module.scss";
import clsx from "clsx";
import Icon from "@/components/Icon";
import Chip from "@/components/Chip";
import MarkItem from "./MarkItem";
import Button from "@/components/Button";

import GenericModal from "@/components/GenericModal/GenericModal";

import { useGetAllMarks } from "@/queries/Marks.queries";
import EmptyException from "@/components/EmptyException/EmptyException";
import getCounterFromArray from "@/utils/getCounterFromArray";
import CreateMarkModal from "./CreateMarkModal";

const MarksSection = () => {
  const { data: allMarksData } = useGetAllMarks();

  const hasData = allMarksData && allMarksData.length > 0;
  const dataCounter = getCounterFromArray(allMarksData);

  return (
    <div className={clsx(Section.Wrapper, Styles.Vehicles)}>
      <div className={Section.Header}>
        <div className={Section.HeaderSide}>
          <Icon name="mark" />
          <p className={Section.HeaderSide_Title}>Marcas</p>
        </div>

        <div className={Section.HeaderSide}>
          <GenericModal
            RenderController={({ onClick }) => (
              <Button
                leftIcon="add"
                label="Cadastrar marca"
                onClick={onClick}
              />
            )}
          >
            {({ onClose }) => <CreateMarkModal onClose={onClose} />}
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
            {allMarksData?.map((mark, index) => (
              <MarkItem data={mark} key={index} />
            ))}
          </div>
        )}

        {!hasData && (
          <div style={{ width: "100%", height: "100%" }}>
            <EmptyException
              title="Nenhuma marca cadastrada"
              description="Você ainda não cadastrou nenhuma marca. Clique no botão acima para cadastrar uma marca."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MarksSection;
