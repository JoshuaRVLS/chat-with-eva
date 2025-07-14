"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSettings } from "../stores/useSettings";
import ImportButton from "./ImportButton";
import ExportButton from "./ExportButton";

const Settings = () => {
  const {
    topP,
    topK,
    maxTokens,
    temperature,
    presencePenalty,
    frequencyPenalty,
    repetitionPenalty,
    setTopP,
    setTopK,
    setMaxTokens,
    setTemperature,
    setPresencePenalty,
    setFrequencyPenalty,
    setRepetitionPenalty,
  } = useSettings();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // CLose modal when outside clicked but onClick is not working?
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openModal &&
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal, settingsMenuRef]);

  useEffect(() => {
    const settings = localStorage.getItem("settings");
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      useSettings.setState(parsedSettings);
    }
  }, []);

  const save = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        topP,
        topK,
        maxTokens,
        temperature,
        presencePenalty,
        frequencyPenalty,
        repetitionPenalty,
      })
    );
    setOpenModal(false);
  };

  return (
    <>
      <button onClick={() => setOpenModal(true)} className="btn">
        Settings
      </button>
      {openModal && (
        <div className="modal">
          <div
            ref={settingsMenuRef}
            className="bg-white shadow border w-fit h-fit p-8 flex flex-col gap-2"
          >
            <div className="flex gap-2 items-center">
              <label>Top P</label>
              <input
                type="number"
                className="border border-gray-300 rounded-md p-1"
                value={topP}
                onChange={(e) => setTopP(Number(e.target.value))}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label>Top K</label>
              <input
                type="number"
                className="border border-gray-300 rounded-md p-1"
                value={topK}
                onChange={(e) => setTopK(Number(e.target.value))}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label>Max Tokens</label>
              <input
                type="number"
                className="border border-gray-300 rounded-md p-1"
                value={maxTokens}
                onChange={(e) => setMaxTokens(Number(e.target.value))}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label>Temperature</label>
              <input
                type="number"
                className="border border-gray-300 rounded-md p-1"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label>Presence Penalty</label>
              <input
                type="number"
                className="border border-gray-300 rounded-md p-1"
                value={presencePenalty}
                onChange={(e) => setPresencePenalty(Number(e.target.value))}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label>Frequency Penalty</label>
              <input
                type="number"
                className="border border-gray-300 rounded-md p-1"
                value={frequencyPenalty}
                onChange={(e) => setFrequencyPenalty(Number(e.target.value))}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label>Repetition Penalty</label>
              <input
                type="number"
                className="border border-gray-300 rounded-md p-1"
                value={repetitionPenalty}
                onChange={(e) => setRepetitionPenalty(Number(e.target.value))}
              />
            </div>
            <div className="flex gap-2">
              <button onClick={save} className="btn">
                Save
              </button>
              <ImportButton />
              <ExportButton />
              <button onClick={() => setOpenModal(false)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
