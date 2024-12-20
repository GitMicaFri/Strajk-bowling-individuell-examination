import "./Shoes.scss";
import { nanoid } from "nanoid";
import React from "react";

import Input from "../Input/Input";

function Shoes({ updateSize, addShoe, shoes }) {
  const shoeComps = shoes.map((input, index) => {
    const label = `Shoe size / person ${index + 1}`;
    return (
      <article className="shoes__form" key={input.id}>
        <Input
          label={label}
          type="text"
          customClass="shoes__input"
          name={input.id}
          handleChange={updateSize}
          maxLength={2}
        />
      </article>
    );
  });

  return (
    <section className="shoes">
      <header>
        <h2 className="shoes__heading">Shoes</h2>
      </header>
      {shoeComps}
      <button
        className="shoes__button"
        onClick={() => {
          addShoe(nanoid());
        }}
      >
        +
      </button>
    </section>
  );
}

export default Shoes;
