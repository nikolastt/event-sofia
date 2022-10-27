import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import React from "react";

// import { Container } from './styles';

const mock = {
  date: { seconds: 1665694070, nanoseconds: 383000000 },
  user: {
    name: "Livia Diniz",
    email: "liviaadinizm@gmail.com",
    image:
      "https://lh3.googleusercontent.com/a/ALm5wu0uB5fWJcSptLEwskWQIaqtTE8ZBHOeXbLEjEg=s96-c",
  },
};

interface IOrder {
  date: number;
  user: {
    name: string;
    email: string;
    image: string;
    tel: string;
  };
}

interface IUserPay {
  order: IOrder;
}

const UserPay: React.FC<IUserPay> = ({ order }) => {
  const date = new Date(order.date);

  return (
    <div className="my-6 ">
      <div className="p-6 bg-slate-700 rounded-xl flex items-center max-w-[600px] mx-auto">
        <div className="relative w-24 flex items-center justify-center h-24 rounded-full overflow-hidden flex-shrink-0">
          <Image src={order.user.image} alt="" layout="fill" />
        </div>
        <div className="flex flex-col justify-center items-center w-full space-y-3">
          <h1 className="py-3 text-white">{order.user.name}</h1>
          <h2 className="break-all text-center">{order.user.email}</h2>
          <h2 className="break-all text-center">{order.user.tel}</h2>
          <h2>
            Data: {date.getDate()} / {date.getMonth() + 1} /{" "}
            {date.getFullYear()}
          </h2>

          <h2>
            Horas: {date.getHours()} : {date.getMinutes()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default UserPay;
