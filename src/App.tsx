import axiosInstance from "./utils/axiosConfig";
import React, { useState } from "react";

const App: React.FunctionComponent = () => {
  const [input, setInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = { prompt: input, max_tokens: 500 };

    try {
      const res = await axiosInstance.post("", params);
      setResponse(res.data.choices[0].text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <p>{response}</p>
    </div>
  );
};

export default App;
