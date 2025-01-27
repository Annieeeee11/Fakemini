import { createContext, useState } from "react";
import run from "../config/api";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev+nextWord);
        }, 75*index)
    }

    const newChat = () => {
        setLoading(false)
        setResponse(false)
    }


  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setResponse(true);
    let responses;
    if (prompt !== undefined) {
        responses = await run(prompt);
        setrecentPrompt(prompt);
    } else {
        setPrevPrompt(prev => [...prev, input]);
        setrecentPrompt(input);
        responses = await run(input);
    }

    setrecentPrompt(input);
    setPrevPrompt(prev => [...prev, input]);
    const answer = responses;  
    let responseArray = answer.split("**");
    let newResponse = "";  
    for (let i = 0; i < responseArray.length; i++) {
        if (i == 0 || i % 2 !== 1) {
            newResponse += responseArray[i];
        } else {
            newResponse += "<b>" + responseArray[i] + "</b>"; 
        }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
    }

    setResultData(newResponse2);
    setLoading(false);
    setInput("");};


  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setrecentPrompt,
    recentPrompt,
    loading,
    resultData,
    response,
    input,
    setInput,
    newChat
  }

  return (
    <Context.Provider value={ contextValue }>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;