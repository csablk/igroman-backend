import React from "react";

const About = () => {
  return (
    <div className="flex flex-col text-center md:flex-row items-center max-w-6xl mx-auto pb-28 justify-between w-full">
      <div className="max-w-lg">
        <p className="text-white text-4xl fade-in">
          Мы рады видеть тебя. <br /> В нашем магазине ты найдешь разнообразные
          аккаунты для игр, приложений и онлайн-сервисов.
        </p>
      </div>
      <div className="mt-5">
        <img src="/gamepad.svg" alt="Gamepad" className="w-80 h-80 bounce" />
      </div>
    </div>
  );
};

export default About;
