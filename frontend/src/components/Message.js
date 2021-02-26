import React from "react";

const Message = ({ children, variant }) => {
  return (
    <div style={{ backgroundColor: variant }} className="alert">
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: "#f44336",
};

export default Message;
