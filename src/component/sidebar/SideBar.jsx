import React, { useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets.js";
import ConditionalText from "./hide.jsx";
import useSidebarToggle from "../../hooks/useHoverToggle.js";
import { Context } from "../../context/Contextt";

const Sidebar = () => {
  const {
    extended,
    toggleExtended,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseOut,
  } = useSidebarToggle();
  const { onSent, setRecentPrompt, prevPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div
      className="sidebar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="top">
        <img
          onClick={toggleExtended}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          <ConditionalText extended={extended}> New Chat</ConditionalText>
        </div>
        <ConditionalText extended={extended}>
          <div className="recent">
            <span className="recent-chats"> Recent </span> 
            {prevPrompt.map((item, index) => {
              return (
                <div
                  key={index} 
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        </ConditionalText>
      </div>
      <div className="bottom">
        <div className="botton-items recent-entry">
          <img src={assets.question_icon} alt="" />
          <ConditionalText extended={extended}> Help </ConditionalText>
        </div>

        <div className="botton-items recent-entry">
          <img src={assets.history_icon} alt="" />
          <ConditionalText extended={extended}> activity </ConditionalText>
        </div>

        <div className="botton-items recent-entry">
          <img src={assets.send_icon} alt="" />
          <ConditionalText extended={extended}> settings </ConditionalText>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
