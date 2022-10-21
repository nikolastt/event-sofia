import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import React from "react";
import { db } from "../services/firebase";
import { authOptions } from "./api/auth/[...nextauth]";

// import { Container } from './styles';

const Payments: React.FC = () => {
  return (
    <div>
      <h1>payments</h1>
    </div>
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

  if (
    emailUser !== "nikolasbitencourtt@gmail.com" &&
    emailUser !== "sofiavalle1602@gmail.com"
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  interface IArrayOrders {
    date: string;
    user: {
      name: string;
      email: string;
      image: string;
    };
  }

  const getOrders = async () => {
    let arrayOrders: IArrayOrders[] = [];

    const q = query(collection(db, "orders"), where("status", "==", "pago"));
    const orderSnapshot = await getDocs(q);
    orderSnapshot.forEach(async (order) => {
      const userRef = doc(db, "users", order.data().userId);
      const userSnap = await getDoc(userRef);
      const user = userSnap.data();

      arrayOrders.push({
        date: order.data().date,
        user: {
          name: user?.name,
          email: user?.email,
          image: user?.image,
        },
      });
    });
    console.log(arrayOrders);

    return arrayOrders;
  };

  const orders = await getOrders();
  // console.log(orders);

  return {
    props: {},
  };
};
