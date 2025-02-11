"use client";

import { useState, useEffect, useRef } from "react";
import useSidebarStates from "../app/store/store";
import { FileUp, Wrench, Send, Pause, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import Response from "@/components/ui/Response";

export function Chat() {
  const { toast } = useToast();
  const { setChat, setParameters, chatBox, Download, Console, Logs, model } = useSidebarStates();
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [modelText, setModelText] = useState("");
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);

  const toParameters = () => {
    setChat(false);
    setParameters(true);
  };

  const handleSendMessage = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() === "") return;

      setLoading(true);
      setTyping(true);

      if (model === "") {
        toast({
          title: "Please select a model to chat with.",
        });
        setLoading(false);
        setTyping(false);
        return;
      }

      const userMessage = { text: input, sender: "user" as const };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const abortController = new AbortController();
      setController(abortController);

      try {
        const response = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            prompt: input,
            stream: true,
          }),
          signal: abortController.signal,
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let botMessage = { text: "", sender: "bot" as const };
        setMessages((prev) => [...prev, botMessage]);

        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const jsonResponse = JSON.parse(chunk);
          botMessage.text += jsonResponse.response;
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = botMessage;
            return newMessages;
          });
        }

        setModelText(model);
        setLoading(false);
        setTyping(false);
        setController(null);
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching model reply:", error);
        }
        setLoading(false);
        setTyping(false);
        setController(null);
      }
    }
  };

  const handleStopResponse = () => {
    if (controller) {
      controller.abort();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", model);

    try {
      const response = await fetch("http://localhost:11434/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const botMessage = { text: data.response, sender: "bot" as const };
      setMessages((prev) => [...prev, botMessage]);

      setLoading(false);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  const handleFileDelete = () => {
    setFile(null);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  return (
    <div className="relative h-full flex-1 rounded-xl bg-muted/50 p-0 pt-4">
      {chatBox && (
        <div className="h-full">
          <div className="relative h-[calc(100vh-17rem)] flex-1">
            <ScrollArea className="relative h-full w-full">
              <Response messages={messages} modelText={modelText} />
              {typing && (
                <div className="px-5 py-3 rounded-lg w-fit max-w-[50%] bg-gray-800 rounded-lg text-white self-start ml-12 mb-2">
                  <div className="flex items-center space-x-1">
                    <div className="typing-dot bg-white rounded-full w-2 h-2 animate-typing1"></div>
                    <div className="typing-dot bg-white rounded-full w-2 h-2 animate-typing2"></div>
                    <div className="typing-dot bg-white rounded-full w-2 h-2 animate-typing3"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </div>

          {file && (
            <div className="flex items-center justify-between w-full px-5 py-2 bg-gray-800 text-white rounded-lg mt-2 max-w-[10%] mx-auto">
              <span className="truncate">{file.name}</span>
              <X onClick={handleFileDelete} className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={20} />
            </div>
          )}

          <div className="flex flex-col items-center justify-between absolute bottom-4 left-4 right-4 bg-[#030816] border border-accent rounded-2xl h-[7.5rem]">
            <div className="w-full">
              <textarea
                className="w-full h-[6vh] pt-2 px-6 mt-2 rounded-lg bg-transparent text-white focus:outline-none resize-none"
                placeholder="Enter your prompt here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleSendMessage}
                disabled={loading}
              ></textarea>
            </div>
            <div className="w-full px-5 mb-3 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-center gap-3">
                <label className={modelSupportsFileUpload(model) ? "" : "opacity-50 cursor-not-allowed"}>
                  <FileUp />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    disabled={!modelSupportsFileUpload(model)}
                    className="hidden"
                  />
                </label>
                <Wrench onClick={toParameters} className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35} />
              </div>
              <div className="flex items-center gap-2 space-x-2 border border-accent py-1 px-3 rounded-2xl">
                <Label htmlFor="cot" className="text-white font-semibold">
                  CoT
                </Label>
                <Switch id="cot" />
              </div>
              <div className="flex items-center">
                {loading ? (
                  <Pause onClick={handleStopResponse} className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35} />
                ) : (
                  <Send onClick={() => handleSendMessage} className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {Download && <></>}
      {Console && <></>}
      {Logs && <></>}
    </div>
  );
}

const modelSupportsFileUpload = (model: string) => {
  // List of models that support file uploads (idk which models support this so I'm leaving it empty for now)
  const supportedModels = ["random-model", ''];
  return supportedModels.includes(model);
};
