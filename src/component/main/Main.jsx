import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Contextt";

const Main = () => {
  const {
    input,
    setInput,
    onSent,
    recentPrompt,
    response,
    loading,
    resultData,
  } = useContext(Context);

  const handleSendClick = () => {
    if (input.trim()) {
      setInput(""); 
      onSent(input); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { 
      e.preventDefault(); 
      handleSendClick();
    }
  }

  return (
    <div className="main">
      <div className="nav">
        <p> Fakini </p>
        <img src="#"></img>
      </div>

      <div className="main-container">
        {!response ? (
          <>
            <div className="greet">
              <p>
                <span>Hello Cutie</span>
              </p>
              <p> Are you lost? </p>
            </div>

            <div className="cards">
              <div className="card">
                <p> Dont Click </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p> Dont Click </p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p> Dont Click </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p> Dont Click </p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="resultt">
            <div className="result-title">
              <img src="#" alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />{" "}
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Search"
              disabled={loading} 
              onKeyDown={handleKeyDown}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input.trim() && !loading ? <img onClick={handleSendClick} src={assets.send_icon} alt="" /> : null}
            </div>
          </div>
          <p className="bottom-info"> This is just another clone i copied from youtube adding some extra things from my side   </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
