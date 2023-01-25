import axios from "axios";
import React, { useState } from "react";

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_API_KEY;
    const headers = { Authorization: `Bearer ${apiKey}` };
    const params = { prompt: input, max_tokens: 500 };

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        params,
        { headers }
      );
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
