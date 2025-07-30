"use client";

import { UserPersona } from "@/app/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaInfo, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import Dropdown from "../Dropdown/Dropdown";
import PersonaCard from "../PersonaCard/PersonaCard";

const Persona = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);

  const [personaName, setPersonaName] = useState<string>("New Persona");
  const [persona, setPersona] = useState<string>("");

  const { isPending, data, error, refetch } = useQuery<UserPersona[]>({
    queryKey: ["myCharacters"],
    queryFn: () =>
      fetch(`/api/persona/${user?.id}`).then((res) =>
        res.json().then((data) => data.data)
      ),
    enabled: !!user?.id,
  });

  const save = async () => {
    try {
      const response = await fetch(`/api/persona/${user?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ personaName, persona: persona }),
      });
      if (!response.ok) {
        return toast.error("Gagal menambahkan persona");
      }

      toast.success("Berhasil menambahkan persona");
      setOpen(false);
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isPending) return <p></p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="pt-32 px-4 flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-4xl font-bitcount">My Persona</h1>
        <span
          onClick={() => setOpen(!open)}
          className="p-4 shadow border border-borders hover:ring-1 ring-borders cursor-pointer rounded-lg"
        >
          + Add Persona
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {data.length ? (
          data.map((persona) => (
            <PersonaCard key={persona.id} initialPersona={persona} />
          ))
        ) : (
          <p className="pt-4 text-lg py-4">Belum ada persona</p>
        )}
        {open && (
          <div className="flex flex-col">
            <Dropdown label={personaName} open={true}>
              <div className="bg-primary-background shadow-2xl p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4 items-center">
                    <FaUser width={40} height={40} />
                    <input
                      type="text"
                      value={personaName}
                      className="input w-full"
                      onChange={(e) => setPersonaName(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4 items-center">
                    <FaInfo width={40} height={40} />
                    <textarea
                      placeholder="Your personality"
                      className="input w-full"
                      value={persona}
                      onChange={(e) => setPersona(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end w-full mt-4 gap-2">
                    <span
                      onClick={() => {
                        setPersonaName("New Persona");
                        setOpen(false);
                      }}
                      className="btn-outline"
                    >
                      Cancel
                    </span>
                    <span onClick={save} className="btn-outline">
                      Save
                    </span>
                  </div>
                </div>
              </div>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Persona;
