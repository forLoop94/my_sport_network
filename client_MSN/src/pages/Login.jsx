import React from "react";
import wall4 from "../assets/wall4.jpeg";
import logo from "../assets/logo.png";

const Login = () => {
  return (
    <section>
      <img
        className="hidden lg:hero object-bottom h-screen"
        src={wall4}
        alt=""
      />
      <div className="w-1/2 h-screen absolute top-0 right-0 flex justify-center items-center">
        <div className="p-[50px] w-2/3 h-4/5 bg-offwhite flex-col items-center border border-blue-500">
          {/* <div className="w-full h-24 flex justify-center items-center">
            <img className="w-12 h-12" src={logo} alt="" />
          </div> */}
          <img className="w-12 h-12" src={logo} alt="" />
          <h1>member login</h1>
          <form>
            <input className="input" type="text" placeholder="email" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

// #0181fd  rgb(1,129,253)
// #fdb803  rgb(253,184,3)

