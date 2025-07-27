"use client";

import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { CharacterTag } from "@/app/generated/prisma";

const CharacterTags = ({
  selectedOptions,
  setSelectedOptions,
}: {
  selectedOptions: { label: string; value: string }[];
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<{ label: string; value: string }[]>
  >;
}) => {
  const { isPending, data, error } = useQuery<CharacterTag[]>({
    queryKey: ["tags"],
    queryFn: () =>
      fetch("/api/tags").then((res) => res.json().then((data) => data.data)),
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <Select
      placeholder="Select tags"
      name="tags"
      isMulti
      options={data?.map((tag) => ({ label: tag.name, value: tag.id })) || []}
      className="input"
      value={selectedOptions}
      onChange={(selectedOptions) => setSelectedOptions([...selectedOptions])}
      classNamePrefix={"select"}
      styles={{
        control: (styles) => ({
          ...styles,
          backgroundColor: "black",
          border: "none",
        }),
        valueContainer: (styles) => ({
          ...styles,
          padding: "10px",
        }),
        multiValue: (styles) => ({
          ...styles,
          color: "purple",
          backgroundColor: "black",
          border: "1px solid gray",
          padding: "5px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }),
        multiValueLabel: (styles) => ({
          ...styles,
          color: "white",
          backgroundColor: "black",

          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
          ...styles,
          color: "white",
          backgroundColor: isFocused ? "black" : "transparent",
          ":hover": {
            backgroundColor: "transparent",
            border: "1px solid purple",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          },
        }),
        menu: (styles) => ({
          ...styles,
          backgroundColor: "black",
          border: "1px solid gray",
          padding: "5px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }),
      }}
    />
  );
};

export default CharacterTags;
