import React from "react";

const ConditionalText =({extended, children}) => {
    return extended ? <p>{children}</p> : null;
}
export default ConditionalText;