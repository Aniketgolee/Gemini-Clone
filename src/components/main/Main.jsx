/* eslint-disable react/no-danger-with-children */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const renderGreeting = () => (
    <div className="greet">
      <p>
        <span>Hello, Dev.</span>
      </p>
      <p>How can I help you today?</p>
    </div>
  );

  const renderCards = () => (
    <div className="cards">
      {[
        {
          text: "Suggest beautiful places for upcoming trips",
          icon: assets.compass_icon,
        },
        {
          text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
          icon: assets.bulb_icon,
        },
        {
          text: "Quibusdam ipsum accusamus dolore impedit repellat",
          icon: assets.message_icon,
        },
        {
          text: "voluptatibus, doloribus quam recusandae consectetur.",
          icon: assets.code_icon,
        },
      ].map((card, index) => (
        <div className="card" key={index}>
          <p>{card.text}</p>
          <img src={card.icon} alt="" />
        </div>
      ))}
    </div>
  );

  const renderResult = () => (
    <div className="result">
      <div className="result-title">
        <img src={assets.user_icon} alt="" />
        <p>{recentPrompt}</p>
      </div>
      <div className="result-data">
        <img src={assets.gemini_icon} alt="" />
        {loading ? (
          <div className="loader">
            <hr />
            <hr />
            <hr />
          </div>
        ) : (
          <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
        )}
      </div>
    </div>
  );

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            {renderGreeting()}
            {renderCards()}
          </>
        ) : (
          renderResult()
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
             {input?<img onClick={onSent} src={assets.send_icon} alt="" />:null} 
            </div>
          </div>
          {/* <p className="bottom-info">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus nam, ipsa.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
