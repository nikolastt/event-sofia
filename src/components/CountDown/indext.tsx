import React, { useEffect, useState } from "react";

interface ICountdown {
  timer: number;
}

const CountDown: React.FC<ICountdown> = ({ timer }) => {
  const date = timer;
  const now = new Date().getTime();

  const [time, setTime] = useState(15 * 60 * 1000 - (now - date));
  //   const [time, setTime] = useState(9000);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      getFormatedDate(time);
      setTime(time - 1000);
    }, 1000);
    if (time < 0) {
    }
  }, [time]);

  const getFormatedDate = (milisseconds: number) => {
    const seconds = Math.floor((milisseconds % (60 * 1000)) / 1000);
    const minutes = Math.floor((milisseconds % (60 * 60 * 1000)) / (1000 * 60));

    setSeconds(seconds);
    setMinutes(minutes);
  };

  //     const days = Math.floor(distance / (24 * 60 * 60 * 1000));
  //     const hours = Math.floor(
  //       (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
  //     );
  //     const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
  //     const seconds = Math.floor((distance % (60 * 1000)) / 1000);

  return (
    <div className="flex justify-center">
      <div>
        {time < 0 ? (
          <h2 className="">Este QR Code expirou</h2>
        ) : (
          <h2 className="text-lg">
            Este Qr Code expirará em :{" "}
            <span className="text-red-800 font-bold">
              {minutes < 10 ? "0" + minutes : minutes} :{" "}
              {seconds < 10 ? "0" + seconds : seconds}
            </span>
          </h2>
        )}
      </div>
    </div>
  );
};

export default CountDown;
