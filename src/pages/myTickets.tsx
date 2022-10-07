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

interface IMyTickets {
  orders: string;
}

const MyTickets: React.FC<IMyTickets> = ({ orders }) => {
  const canvasRef = useRef();

  const [userOrders, setUserOrders] = useState<IOrders[]>(JSON.parse(orders));

  return (
    <LayoutApplication>
      <div className="min-h-[calc(100vh-79px)] mt-[79px]">
        <h1 className="mb-6">Meus ingressos</h1>

        <div>
          <h1 className="mt-12">Você não possui nenhum ingresso !</h1>
        </div>

        {userOrders.map((order) => {
          if (order.status === "pago") {
            return (
              <>
                <div
                  key={order.time.toString()}
                  className="bg-primary-500 rounded-2xl h-52 flex mb-6  max-w-[700px] mx-auto "
                >
                  <div className=" flex items-center justify-center pl-6 md:pl-0 md:w-1/2 h-full ">
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

                  <div className="text-white  w-1/2 flex flex-col items-center">
                    <h2 className="mt-6 font-bold text-2xl ">Geaan Leite</h2>

                    <span className=" text-center  text-white flex flex-col items-center mt-6">
                      <AiOutlineCalendar
                        size={20}
                        className="text-black mb-2"
                      />
                      26/11/2022 - 7:30 - 17:00 GMT-3 <br />
                    </span>
                  </div>
                </div>
              </>
            );
          }
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
  const q = query(ordersRef, where("userId", "==", userId));
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
