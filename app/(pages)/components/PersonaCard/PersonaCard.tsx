"use client";

import { UserPersona } from "@/app/generated/prisma";
import React, { useContext, useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { FaInfo, FaUser } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const PersonaCard = ({ initialPersona }: { initialPersona: UserPersona }) => {
  const [personaName, setPersonaName] = useState<string>(initialPersona.name);
  const [persona, setPersona] = useState<string>(initialPersona.person);

  const { user } = useContext(AuthContext);

  const { isPending, data, error, refetch } = useQuery<String>({
    queryKey: ["personaUsed"],
    queryFn: () =>
      fetch(`/api/persona-used/${user?.id}`).then((res) =>
        res.json().then((data) => data.data)
      ),
    enabled: !!user?.id,
  });

  const usePersona = async () => {
    try {
      const response = await fetch("/api/persona-used", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          personaId: initialPersona.id,
        }),
      });
      if (!response.ok) {
        toast("Gagal menggunakan persona");
        return;
      }

      toast.success("Berhasil menggunakan persona");
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Dropdown label={personaName}>
      <div className="bg-primary-background shadow-2xl p-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <FaUser width={40} height={40} />
            <input
              type="text"
              value={personaName}
              className="input w-full"
              disabled
              onChange={(e) => setPersonaName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <FaInfo width={40} height={40} />
            <textarea
              placeholder="Your personality"
              className="input w-full"
              value={persona}
              disabled
              onChange={(e) => setPersona(e.target.value)}
            />
          </div>
          <div className="flex justify-end w-full mt-4 gap-2">
            <button
              className="btn-outline"
              disabled={data === initialPersona.id}
              onClick={usePersona}
            >
              {data === initialPersona.id ? "Used" : "Use"}
            </button>
          </div>
        </div>
      </div>
    </Dropdown>
  );
};

export default PersonaCard;
