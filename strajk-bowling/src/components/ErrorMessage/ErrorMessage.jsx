import "./ErrorMessage.scss";
import React from 'react';


function ErrorMessage({ message }) {
  return (
    <article className="error-message">
      <p className="error-message__text">{message}</p>
    </article>
  );
}

export default ErrorMessage;
