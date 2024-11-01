/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const[input, setInput] = useState("");
    const[recentPrompt, setRecentPrompt] = useState("");
    const[prevPrompt, setPrevPrompt] = useState([]);
    const[showResult, setShowResult] = useState(false);
    const[loading, setLoading] = useState(false);
    const[resultData, setResultData]= useState("");

    const delayPara = (index, nextWord)=>{
        setTimeout(()=>{
            setResultData(prev=>prev+nextWord);
        },75*index)
    }
        
    const onSent = async (prompt) => {
        try {
            setResultData("");
            setLoading(true);
            setShowResult(true);
            // let response;
            // if(prompt !== undefined){
            //     response = await run(prompt);
            //     setRecentPrompt(prompt)
            // }else{
            //     setPrevPrompt(prev=>[...prev,input])
            //     setRecentPrompt(input)
            //     response = await run(input)
            // }
            setRecentPrompt(input);
            setPrevPrompt(prev=>[...prev,input])
            const response = await run(input);
            let responseArray = response.split("**");
            let newResponse="";
            for(let i=0; i<responseArray.length;i++){
                if(i===0 || i%2!==1){
                    newResponse+= responseArray[i];
                }else{
                    newResponse+= "<b>"+responseArray[i]+"</b>"
                }
            }
            let newResponse2= newResponse.split("*").join("</br>");
            let newResponeArray = newResponse2.split(" ");
            for(let i=0; i<=newResponeArray.length;i++){
                const nextWord = newResponeArray[i];
                delayPara(i,nextWord)
            }
            setResultData(newResponse2);
        } catch (error) {
            console.error("Error fetching data:", error);
            setResultData("Error fetching data");
        } finally {
            setLoading(false);
            setInput("");
        }
    };
    

    const contextValue = {
        // Populate context value here
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;
