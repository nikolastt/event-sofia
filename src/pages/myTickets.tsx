import React, { useEffect, useRef, useState } from "react";
import LayoutApplication from "../components/Layout";
import QRCode from "react-qr-code";
import QRCodeLink from "qrcode";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { IOrders } from "./checkOut";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { AiOutlineCalendar } from "react-icons/ai";
import Link from "next/link";

interface IMyTickets {
  orders: string;
}

const MyTickets: React.FC<IMyTickets> = ({ orders }) => {
  const canvasRef = useRef();

  const [userOrders, setUserOrders] = useState<IOrders[]>(JSON.parse(orders));

  console.log(userOrders);

  return (
    <LayoutApplication>
      <div className="min-h-[calc(100vh-79px)] mt-[79px]">
        <h1 className="mb-6 text-white">Meus ingressos</h1>

        {userOrders.length < 1 && (
          <div>
            <h1 className="mt-12 text-white">
              Você não possui nenhum ingresso !
            </h1>
            <div className="flex mx-auto justify-center items-center  lg:w-1/4 lg:h-full pt-12 pb-6">
              <Link href="/checkOut">
                <button className="bg-primary-500 py-3 px-12 rounded-full text-white font-medium hover:scale-105 duration-300 animate-pulse">
                  COMPRAR INGRESSOS
                </button>
              </Link>
            </div>
          </div>
        )}

        {userOrders.map((order) => {
          return (
            <div key={order.time.toString()}>
              <div className="bg-primary-500 rounded-2xl p-6 flex flex-col mb-6  max-w-[700px] mx-auto ">
                <div className="flex w-full justify-between">
                  <div className=" flex items-center justify-center  md:pl-0 md:w-1/2 h-full ">
                    <div>
                      <QRCode
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        size={150}
                        value={order.txid}
                      />
                    </div>
                  </div>

                  <div className="text-white  w-1/2 flex flex-col items-center  justify-center">
                    <h2 className="mt-6 font-bold text-2xl ">Geaan Leite</h2>

                    <span className=" text-center  text-white flex flex-col items-center ">
                      <AiOutlineCalendar
                        size={20}
                        className="text-white mb-2 mt-6"
                      />
                      26/11/2022 - 7:30 - 17:00 <br />
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="font-light text-lg text-center text-slate-900">
                    Apresentar na entrada do evento !
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </LayoutApplication>
  );
};

export default MyTickets;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/notLogin",
        permanent: false,
      },
    };
  }

  const userId = session?.id;

  let ordersUser: IOrders[] = [];
  const ordersRef = collection(db, "orders");

  const q = query(
    ordersRef,
    where("userId", "==", userId),
    where("status", "==", "pago")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ordersUser.push({ ...doc.data(), txid: doc.id } as IOrders);
  });

  const orders = JSON.stringify(ordersUser);

  return {
    props: {
      orders,
    },
  };
};
