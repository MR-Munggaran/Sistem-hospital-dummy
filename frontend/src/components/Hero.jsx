import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
            nostrum! Dignissimos, voluptas? Deleniti, quis. Dolor rerum rem
            nihil dicta, earum aspernatur autem? Delectus ex quis commodi nulla
            iste eos maxime ipsam soluta vero a, ipsum illum officia harum
            aspernatur reprehenderit explicabo dolorem maiores odit. Eum itaque
            ab quia eos delectus, reiciendis, autem eaque veritatis nostrum
            impedit nam iure recusandae ducimus.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
