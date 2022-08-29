import React, { useEffect, useState } from "react";

// import { Container } from './styles';

import { AiOutlineLine, AiOutlinePlus } from "react-icons/ai";

interface ICardBuyTickets {
  priceOfTicket: number;
  title: string;
}

const CardBuyTickets: React.FC<ICardBuyTickets> = ({
  priceOfTicket = 0,
  title,
}) => {
  const [numberOfTickets, setNumberOfTickets] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalcount = 0;

    totalcount = numberOfTickets * priceOfTicket;
    setTotal(totalcount);
  }, [numberOfTickets, priceOfTicket]);

  return (
    <div className="shadow-2xl bg-white rounded-xl backdrop-blur-lg border-gray-700 px-6 py-6">
      <h1 className="text-left">{title}</h1>
      <span className="text-xl font-light ">
        {priceOfTicket === 0 ? "Grátis" : `R$${priceOfTicket}`}
        <br />
      </span>
      <span className="text-lg font-light">até 17/10/2022</span>

      <div className="mt-12 flex w-full items-center">
        <div>
          <h1>Total: R${total}</h1>
        </div>

        <div className=" ml-auto  px-6  n  ">
          <div className="flex  items-center space-x-6">
            <button
              className={`cursor-pointer border-2  border-black/30 ${
                numberOfTickets <= 0 && "cursor-not-allowed"
              } py-1 px-1 rounded-full  shadow `}
            >
              <AiOutlineLine
                className={` ${numberOfTickets <= 0 && "text-gray-400"}`}
                size={15}
                onClick={() =>
                  setNumberOfTickets((prevValue) => {
                    return prevValue > 0 ? prevValue - 1 : prevValue;
                  })
                }
              />
            </button>
            <span className="text-2xl font-semi-bold">{numberOfTickets}</span>
            <button className="py-1 px-1 rounded-full border-2 border-primary-500 text-primary-500 shadow ">
              <AiOutlinePlus
                className="cursor-pointer "
                size={15}
                onClick={() => setNumberOfTickets((prevValue) => prevValue + 1)}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBuyTickets;
