"use client";

import Styles from "./AsideVehicles.module.scss";
import Section from "../Section.module.scss";
import clsx from "clsx";
import Chip from "@/components/Chip";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import AsideVehicleItem from "./AsideVehicleItem";
import Button from "@/components/Button";
import GenericModal from "@/components/GenericModal/GenericModal";
import { useGetAllVehicles } from "@/queries/Vehicles.queries";
import getCounterFromArray from "@/utils/getCounterFromArray";
import EmptyException from "@/components/EmptyException/EmptyException";
import CreateVehicleModal from "./CreateVehicleModal";

const AsideVehicles = () => {
  const { data: allVehiclesData, mutate: searchVehiclesMutate } =
    useGetAllVehicles();

  const [viewMode, setViewMode] = useState<"blocks" | "list">("blocks");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChangeViewMode = (mode: "blocks" | "list") => {
    setViewMode(mode);
  };

  const handleSearchVehicles = () => {
    searchVehiclesMutate(
      { searchTerm: searchTerm.trim() },
      {
        onError: (error) => {
          console.error("Error searching vehicles:", error);
          alert("Erro ao buscar veículos. Tente novamente mais tarde.");
        },
      }
    );
  };

  useEffect(() => {
    searchVehiclesMutate({
      searchTerm: "",
    });
  }, [searchVehiclesMutate]);

  const hasData = allVehiclesData && allVehiclesData.length > 0;
  const dataCounter = getCounterFromArray(allVehiclesData);

  return (
    <div className={clsx(Section.Wrapper, Styles.Vehicles)}>
      <div className={Section.Header}>
        <div className={Section.HeaderSide}>
          <Icon name="vehicle" />
          <p className={Section.HeaderSide_Title}>Veículos</p>
        </div>

        <Chip label={dataCounter} />
      </div>

      <div className={Styles.Content}>
        <div className={Styles.Search}>
          <input
            className={Styles.Search__Input}
            placeholder="Pesquisar por nome, marca, modelo, cor, preço..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchVehicles();
              }
            }}
          />
          <button
            className={Styles.SearchButton}
            onClick={handleSearchVehicles}
            disabled={!searchTerm.trim()}
          >
            <p className={Styles.SearchButton__Text}>Pesquisar</p>
            <Icon name="search" size={16} />
          </button>
        </div>

        <div className={Styles.Container}>
          <div className={Styles.Results}>
            <p className={Styles.Results_Title}>Resultados</p>

            <div className={Styles.Results__Actions}>
              <button
                className={clsx(
                  Styles.Results__Action,
                  viewMode === "blocks" && Styles.Results__Action__Active
                )}
                onClick={() => handleChangeViewMode("blocks")}
              >
                <Icon
                  name={viewMode === "blocks" ? "blocks-white" : "blocks"}
                  size={16}
                />
              </button>
              <button
                className={clsx(
                  Styles.Results__Action,
                  viewMode === "list" && Styles.Results__Action__Active
                )}
                onClick={() => handleChangeViewMode("list")}
              >
                <Icon
                  name={viewMode === "list" ? "list-white" : "list"}
                  size={16}
                />
              </button>
            </div>
          </div>

          <div className={Styles.ContentScroll}>
            {hasData && (
              <div
                className={clsx(
                  viewMode === "list"
                    ? Styles.ContentList
                    : Styles.ContentBlocks
                )}
              >
                {allVehiclesData.map((vehicle, index) => (
                  <AsideVehicleItem
                    key={index}
                    data={vehicle}
                    type={viewMode}
                  />
                ))}
              </div>
            )}

            {!hasData && (
              <EmptyException
                title="Nenhum veículo cadastrado"
                description={`Você ainda não cadastrou nenhum veículo.\nClique no botão abaixo para cadastrar um veículo.`}
              />
            )}
          </div>
        </div>
      </div>

      <div className={Styles.Footer}>
        <GenericModal
          RenderController={({ onClick }) => (
            <Button
              leftIcon="add"
              label="Adicionar veículo"
              onClick={onClick}
            />
          )}
        >
          {({ onClose }) => <CreateVehicleModal onClose={onClose} />}
        </GenericModal>
      </div>
    </div>
  );
};

export default AsideVehicles;
