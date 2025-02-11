import React from "react";

interface ResponseProps {
  messages: { text: string; sender: "user" | "bot" }[];
  modelText: string;
}

const parseAndFormatText = (text: string) => {
  // parsing and formatting logic
  const formattedText = text
    .replace(/<think>/g, "")
    .replace(/<\/think>/g, "")
    .replace(/\n/g, "<br />");

  return formattedText;
};

const Response: React.FC<ResponseProps> = ({ messages, modelText }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          {msg.sender !== "user" && <p className="text-xs text-gray-400 ml-16">{modelText}</p>}
          <div
            className={`px-5 py-3 rounded-lg w-fit max-w-[50%] ${
              msg.sender === "user"
                ? "bg-[#000]/25 text-white self-end mr-16 ml-auto mb-2"
                : "bg-transparent text-white self-start ml-12 mb-2"
            }`}
            dangerouslySetInnerHTML={{ __html: parseAndFormatText(msg.text) }}
          />
        </div>
      ))}
    </div>
  );
};

export default Response;
