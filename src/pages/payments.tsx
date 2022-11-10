import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import React from "react";
import LayoutApplication from "../components/Layout";
import { viewPayments } from "../components/SideBar";
import UserPay from "../components/UserPay";
import { db } from "../services/firebase";
import { authOptions } from "./api/auth/[...nextauth]";

// import { Container } from './styles';

interface IArrayOrders {
  date: number;
  user: {
    name: string;
    email: string;
    image: string;
    tel: string;
  };
}

interface IPayments {
  orders: string;
}

const Payments: React.FC<IPayments> = ({ orders }) => {
  const ordersData: IArrayOrders[] = JSON.parse(orders);

  return (
    <LayoutApplication>
      <div>
        <h1 className="text-white mt-24">Total compras: {ordersData.length}</h1>
        {ordersData.map((order) => (
          <UserPay key={order.date} order={order} />
        ))}
      </div>
    </LayoutApplication>
  );
};

export default Payments;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const emailUser = session?.user?.email;

  const authorized = viewPayments(emailUser as string);

  if (!authorized) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let arrayOrders: IArrayOrders[] = [];
  const q = query(
    collection(db, "orders"),
    where("status", "==", "pago"),
    orderBy("date", "desc")
  );
  const orderSnapshot = await getDocs(q);

  const q2 = query(collection(db, "users"), where("tel", "!=", "null"));
  const usersPay = await getDocs(q2);

  for (const order of orderSnapshot.docs) {
    for (const user of usersPay.docs) {
      if (order.data().userId === user.id) {
        arrayOrders.push({
          date: order.data().time,
          user: {
            name: user.data().name,
            email: user.data().email,
            image: user.data().image,
            tel: user.data().tel,
          },
        });
      }
    }
  }

  const orders = JSON.stringify(arrayOrders);

  return {
    props: {
      orders,
    },
  };
};
