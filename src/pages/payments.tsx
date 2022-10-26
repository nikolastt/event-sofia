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
import UserPay from "../components/UserPay";
import { db } from "../services/firebase";
import { authOptions } from "./api/auth/[...nextauth]";

// import { Container } from './styles';

interface IArrayOrders {
  date: Timestamp;
  user: {
    name: string;
    email: string;
    image: string;
  };
}

interface IPayments {
  orders: string;
}

const mock = {
  date: { seconds: 1665694070, nanoseconds: 383000000 },
  user: {
    name: "Livia Diniz",
    email: "liviaadinizm@gmail.com",
    image:
      "https://lh3.googleusercontent.com/a/ALm5wu0uB5fWJcSptLEwskWQIaqtTE8ZBHOeXbLEjEg=s96-c",
  },
};

const dateTeste = new Date(mock.date.seconds * 1000);
console.log(dateTeste);

const Payments: React.FC<IPayments> = ({ orders }) => {
  const ordersData: IArrayOrders[] = JSON.parse(orders);

  return (
    <div>
      <h1 className="text-white my-6">Total compras: {ordersData.length}</h1>
      {ordersData.map((order) => (
        <UserPay key={order.date.seconds} order={order} />
      ))}
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

  let arrayOrders: IArrayOrders[] = [];
  const q = query(collection(db, "orders"), where("status", "==", "pago"));
  const orderSnapshot = await getDocs(q);

  for (const order of orderSnapshot.docs) {
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
  }
  const orders = JSON.stringify(arrayOrders);

  return {
    props: {
      orders,
    },
  };
};
