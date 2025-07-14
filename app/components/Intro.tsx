"use client";

import React, { useEffect, useState } from "react";
import { useName } from "../stores/useName";

const Intro = () => {
  const [showIntro, setShowIntro] = useState(true);
  const { name, setName } = useName();

  return (
    <>
      {showIntro && (
        <div className="modal bg-black">
          <div className="p-4 bg-white border shadow flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Chat dengan Eva
            </h2>
            <div className="mt-2 text-gray-600 flex flex-col ">
              <span>*action* for action</span>
              <span>
                "dialog" Start dialog. Lu juga bisa nyuruh Eva untuk ngomong
              </span>
              <span>
                contoh "Halo Jos" *Cakap eva*. Ya bisa terserah lu lah
              </span>
              <span>
                **narration** start narasi. Contoh **Waktu di sekolah**
              </span>
              <span className="mt-4 mb-4">
                NFSW Allowed ( Kamu bisa{" "}
                <span className="font-black bg-black p-2 text-white">
                  .....
                </span>{" "}
                sepuasnya HAHAHHAHA )
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border"
                placeholder="Masukin nama lo"
              />
              <button
                disabled={!name}
                className={`btn mt-5 ${!name && "opacity-70"}`}
                onClick={() => setShowIntro(false)}
              >
                {!name ? "Masukin nama dulu cok" : "Mulai chat"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Intro;
