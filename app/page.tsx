"use client";

import Image from "next/image";
import {
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { models, completion } from "./utils/openai";
import Card from "./components/Card";
import type { Message } from "./components/types/types";
import Settings from "./components/Settings";
import { useSettings } from "./stores/useSettings";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [model, setModel] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    topP,
    topK,
    maxTokens,
    temperature,
    presencePenalty,
    frequencyPenalty,
    repetitionPenalty,
  } = useSettings();
  const msgRef = useRef<HTMLDivElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);
  const MemoizedCard = memo(Card);

  useEffect(() => {
    // CLose modal when outside clicked but onClick is not working?
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openModal &&
        modelMenuRef.current &&
        !modelMenuRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  useEffect(() => {
    const messages = localStorage.getItem("messages");
    const model = localStorage.getItem("model");
    if (model) {
      setModel(parseInt(model));
    }
    if (messages) {
      setMessages(JSON.parse(messages));
      msgRef.current?.scrollTo(0, msgRef.current.scrollHeight);
    }
  }, []);

  const addItem = async ({ role, content, fromUser }: Message) => {
    setMessages((prev) => {
      localStorage.setItem(
        "messages",
        JSON.stringify([
          ...prev,
          { role: role, content: content, fromUser: fromUser },
        ])
      );
      return [...prev, { role: role, content: content, fromUser: fromUser }];
    });
    msgRef.current?.scrollTo(0, msgRef.current.scrollHeight);
  };

  const handleModelChange = useCallback((model: number) => {
    setModel(model);
    localStorage.setItem("model", model.toString());
  }, []);

  const submit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    await addItem({ role: "user", content: text, fromUser: true });
    setText("");
    const response = await completion(
      models[model],
      text,
      messages,
      topP,
      topK,
      maxTokens,
      temperature,
      presencePenalty,
      frequencyPenalty,
      repetitionPenalty
    );
    await addItem({
      role: "user",
      content: response.choices[0].message.content,
      fromUser: false,
    });
    setLoading(false);
    msgRef.current?.scrollTo(0, msgRef.current.scrollHeight);
  };

  const renderedMessages = useMemo(() => {
    return messages.map((msg, idx) => (
      <MemoizedCard
        key={idx}
        idx={idx}
        msg={msg}
        messages={messages}
        setMessages={setMessages}
        setLoading={setLoading}
        addItem={addItem}
        model={model}
      />
    ));
  }, [messages, model]);

  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden">
      <div className="flex flex-col w-full justify-center items-center h-full gap-2 p-2 rounded-md">
        <div
          ref={msgRef}
          className="bg-gray-900 w-full md:w-[70%] rounded-lg scrollbar-hide overflow-scroll shadow font-light h-[40rem] gap-8 flex flex-col p-4 md:p-12"
        >
          {renderedMessages}
          {loading && (
            <div className="flex p-2 bg-white gap-3 items-center">
              <Image
                src="/cewek.jpeg"
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-right font-bold text-gray-500">
                Mengetik
              </span>
            </div>
          )}
        </div>
        <form onSubmit={submit} className="w-full relative">
          <textarea
            required
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Type here"
            className="p-4 pr-20 text-wrap h-fit w-full flex items-center border resize-none"
          />
          <button
            type="submit"
            className="absolute right-6 top-0 bottom-0 cursor-pointer"
          >
            Send
          </button>
        </form>
        <div className="flex gap-2 items-center">
          {models[model]} {""}
          <button onClick={() => setOpenModal(true)} className="btn">
            Change
          </button>
          <Settings />
        </div>
      </div>

      {openModal && (
        <div className="modal">
          <div
            ref={modelMenuRef}
            className={` ${
              !openModal ? "opacity-0" : "opacity-100"
            } relative bg-white w-fit border transition h-fit p-8 flex flex-col pt-8 gap-2 shadow`}
          >
            {models.map((modelId, idx) => (
              <span
                key={idx}
                onClick={() => {
                  handleModelChange(idx);
                }}
                className={`cursor-pointer hover:opacity-70 ${
                  model === idx ? "font-bold" : ""
                }`}
              >
                {modelId}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
