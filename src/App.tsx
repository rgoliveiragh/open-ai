import axios from "axios";
import React from "react";

interface ChatGPTProps {}
interface ChatGPTState {
  input: string;
  response: string;
}

class App extends React.Component<ChatGPTProps, ChatGPTState> {
  constructor(props: ChatGPTProps) {
    super(props);
    this.state = {
      input: "",
      response: "",
    };
  }

  async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_API_KEY;
    const headers = { Authorization: `Bearer ${apiKey}` };
    const params = { prompt: this.state.input, max_tokens: 500 };

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        params,
        { headers }
      );
      this.setState({ response: res.data.choices[0].text });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            value={this.state.input}
            onChange={(e) => this.setState({ input: e.target.value })}
          />
          <button type="submit">Enviar</button>
        </form>
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default App;
