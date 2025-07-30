"use client";

import React, { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import { usePersonaModal } from "@/app/stores/usePersonaModal";
import { useQuery } from "@tanstack/react-query";
import { UserPersona } from "@/app/generated/prisma";
import { AuthContext } from "../../providers/AuthProvider";

const PersonaModal = () => {
  const { isOpen, setIsOpen } = usePersonaModal();
  const { user } = useContext(AuthContext);
  const [openCreatePersonaModal, setOpenCreatePersonaModal] =
    useState<boolean>(false);

  const { isPending, data, error } = useQuery<UserPersona[]>({
    queryKey: ["personas"],
    queryFn: () =>
      fetch(`/api/persona/${user?.id}`).then((res) =>
        res.json().then((data) => data.data)
      ),
    enabled: !!user?.id,
  });

  if (isPending) return <p>Loading Your Persona</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Modal hidden={!isOpen}>
        <div className="p-6 w-full m-4 lg:w-[60%] flex flex-col justify-center bg-primary-background border border-borders shadow">
          <h1 className="font-bitcount text-xl">Your Persona</h1>
          <div className="flex flex-col gap-2 mt-4">
            {data.map((persona) => (
              <div>{persona.name}</div>
            ))}
            {openCreatePersonaModal && (
              <div className="flex gap-2 items-center">
                <input placeholder="Persona Name" className="input" />
                <textarea
                  className="w-full p-2"
                  placeholder="Your Personality"
                />
              </div>
            )}
            <div
              onClick={() => setOpenCreatePersonaModal(!openCreatePersonaModal)}
              className="btn-outline"
            >
              {openCreatePersonaModal ? "Cancel" : "Create Persona"}
            </div>
            <button onClick={() => setIsOpen(false)} className="btn-outline">
              Close Tab
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PersonaModal;
