import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import LayoutApplication from "../components/Layout";
import axios from "axios";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { db } from "../services/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { AiOutlineCalendar } from "react-icons/ai";
import Link from "next/link";

import { BounceLoader } from "react-spinners";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CopyToClipboard } from "react-copy-to-clipboard";

interface ICheckOut {
  userId: string;
  orders: string;
}

export interface IOrders {
  date: Timestamp;
  time: Timestamp;
  txid: string;
  qrCode: {
    imagemQrcode: string;
    qrcode: string;
  };
  quantity: string;
  status: string;
  userId: string;
}

interface IOrderQRCode {
  imagemQrcode: string;
  qrcode: string;
}

const CheckOut: React.FC<ICheckOut> = ({ userId, orders }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [sobrenome, setSobrenome] = useState("");
  const [sobrenomeError, setSobrenomeError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [tel, setTel] = useState("");
  const [telError, setTelError] = useState(false);
  const [checkOutSuccess, setCheckOutSuccess] = useState(true);

  const [loading, setLoading] = useState(false);

  const [orgerQRCode, setOrderQRCode] = useState<IOrderQRCode[]>([]);

  const [loteEncerrado, setLoteEncerrado] = useState(false);

  const userOrders: IOrders[] = JSON.parse(orders);

  useEffect(() => {
    const setOrders = () => {
      userOrders.forEach((order) => {
        if (order.status === "pending") {
          setOrderQRCode((images) => [
            ...images,
            {
              imagemQrcode: order.qrCode.imagemQrcode,
              qrcode: order.qrCode.qrcode,
            },
          ]);
        }
      });
    };
    setOrders();
  }, []);

  const checkInputs = () => {
    let isInvalid = false;

    if (name === "") {
      setNameError(true);
      setLoading(false);
      isInvalid = true;
    }
    if (sobrenome === "") {
      setSobrenomeError(true);
      setLoading(false);
      isInvalid = true;
    }
    if (email === "") {
      setEmailError(true);
      setLoading(false);
      isInvalid = true;
    }
    if (tel === "") {
      setTelError(true);
      setLoading(false);
      isInvalid = true;
    }

    return isInvalid;
  };

  const checkOutFunction = async () => {
    setLoading(true);

    const isInvalid = checkInputs();

    if (!isInvalid) {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        sobrenome,
        tel,
      });

      const options = {
        method: "POST",
        url: "https://geaan-leite.herokuapp.com/",
        headers: { "Content-Type": "application/json" },
        data: { quantity: "1", userId: userId },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          if (response.data.lote === "encerrado") {
            setLoteEncerrado(true);
          } else {
            setLoading(false);
            setCheckOutSuccess(true);
            notifySuccess();
            setOrderQRCode([...orgerQRCode, response.data.imagemQrcode]);
            setOrderQRCode((orders) => [
              ...orders,
              {
                imagemQrcode: response.data.imagemQrcode,
                qrcode: response.data.qrcode,
              },
            ]);
          }
        })
        .catch(function (error) {
          notifyError();
          setLoading(false);
          console.error(error);
        });

      // }
    } else {
      notifyErrorInputs();
      setLoading(false);
    }
  };

  console.log(loteEncerrado, "lote encerrado");

  const notifySuccess = () =>
    toast.success("🐄 Wow Pagamento gerado!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyCopySuccess = () =>
    toast.success("🐄 Wow Qr Code Copiado!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyError = () =>
    toast.error("🐄 Algo deu errado !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyErrorInputs = () =>
    toast.error("🐄 É necessário preencher todos os campos", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      <LayoutApplication>
        <div className="min-h-[calc(100vh-79px)] mt-[79px] text-white">
          <div>
            <h1 className="text-white">GEaan Evento - Inscrição</h1>

            <span className=" text-center  text-white flex flex-col items-center mt-6">
              <AiOutlineCalendar size={20} className="text-white mb-2" />
              26/11/2022 - 7:30 - 17:00 GMT-3 <br />
            </span>
          </div>
          {!loteEncerrado ? (
            orgerQRCode.length >= 1 ? (
              <div className="flex flex-col items-center mt-6">
                <div>
                  <h1 className="text-white">Pagementos pendentes</h1>
                </div>
                {orgerQRCode?.map(
                  (orderQRCode) =>
                    orderQRCode.imagemQrcode && (
                      <div
                        key={
                          orderQRCode.imagemQrcode +
                          new Date().getMilliseconds()
                        }
                        className="bg-primary-500 rounded-2xl p-10 mt-6  mb-6 w-full flex flex-col justify-center  max-w-[700px] mx-auto items-center "
                      >
                        <div>
                          <img src={orderQRCode.imagemQrcode}></img>
                        </div>

                        <div className="w-full cursor-pointer">
                          <CopyToClipboard
                            onCopy={() => notifyCopySuccess()}
                            text={orderQRCode.qrcode}
                          >
                            <h1 className="my-6 cursor-pointer">
                              Qlique para copiar Pix Copia e Cola
                            </h1>
                          </CopyToClipboard>
                          <CopyToClipboard
                            onCopy={() => notifyCopySuccess()}
                            text={orderQRCode.qrcode}
                          >
                            <p className="break-words cursor-pointer">
                              {orderQRCode.qrcode}
                            </p>
                          </CopyToClipboard>
                        </div>
                      </div>
                    )
                )}

                <h1 className="mb-3 text-white">
                  Após confirmarmos o pagamento, seu ingresso estará disponível
                  em:
                </h1>
                <Link href="myTickets" passHref>
                  <button className="bg-primary-500 mt-6 animate-pulse py-3 px-12 rounded-full text-white font-medium hover:scale-105 duration-300 ">
                    MEUS QRCODES
                  </button>
                </Link>
              </div>
            ) : (
              <div className="mt-6 ">
                <div className="shadow-2xl overflow-hidden">
                  <div className="w-full h-10 rounded-t-xl bg-primary-500 text-white overflow-hidden ">
                    <div className="flex justify-between items-center h-full px-3">
                      <p>Ingressos</p>

                      <div>Cart R$ 26,00</div>
                    </div>
                  </div>

                  <div className="border border-primary-500 overflow-hidden rounded-b-xl h-36 flex justify-between items-center">
                    <div className="p-3">
                      <p className="font-bold text-lg mb-3">Inscrição</p>
                      <p>R$: 25,00 + R$1,00 - Taxa</p>
                    </div>

                    <div className="p-3 text-2xl h-full flex items-center">
                      1
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-white">
                  <h1 className="text-white my-12">
                    Informações do participante
                  </h1>

                  <h2 className="text-center mt-3">Ingresso : Inscrição</h2>

                  <div className="space-y-6">
                    <div key="nome" className="flex flex-col">
                      <label htmlFor="nome">
                        Nome <span className="ml-1">*</span>
                      </label>
                      <input
                        type="Text"
                        name="nome"
                        id="nome"
                        className={`bg-gray-800 shadow border border-primary-500 focus:outline-none px-3 py-1 rounded-lg ${
                          nameError && " !border-red-500"
                        }`}
                        onChange={(e) => {
                          setNameError(false);
                          setName(e.target.value);
                        }}
                      />
                    </div>

                    <div key="sobrenome" className="flex flex-col">
                      <label htmlFor="nome">
                        Sobrenome <span className="ml-1">*</span>
                      </label>
                      <input
                        type="Text"
                        name="sobrenome"
                        id="sobrenome"
                        className={`bg-gray-800 shadow border border-primary-500 focus:outline-none px-3 py-1 rounded-lg ${
                          sobrenomeError && " !border-red-500"
                        }`}
                        onChange={(e) => {
                          setSobrenomeError(false);
                          setSobrenome(e.target.value);
                        }}
                      />
                    </div>

                    <div key="Email" className="flex flex-col">
                      <label htmlFor="nome">
                        E-mail <span className="ml-1">*</span>
                      </label>
                      <input
                        type="email"
                        name="Email"
                        id="Email"
                        className={`bg-gray-800 shadow border border-primary-500 focus:outline-none px-3 py-1 rounded-lg ${
                          emailError && " !border-red-500"
                        }`}
                        onChange={(e) => {
                          setEmailError(false);
                          setEmail(e.target.value);
                        }}
                      />
                    </div>

                    <div key="tel" className="flex flex-col">
                      <label htmlFor="nome">
                        Telefone <span className="ml-1">*</span>
                      </label>
                      <input
                        type="Text"
                        name="tel"
                        id="tel"
                        className={`bg-gray-800 shadow border border-primary-500 focus:outline-none px-3 py-1 rounded-lg ${
                          telError && " !border-red-500"
                        }`}
                        onChange={(e) => {
                          setTelError(false);
                          setTel(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="my-12 full flex justify-center">
                  {loading ? (
                    <BounceLoader color="#70963F" size={60} />
                  ) : (
                    <>
                      <button
                        onClick={checkOutFunction}
                        className="bg-primary-500 py-3 px-12 rounded-full text-white font-medium hover:scale-105 duration-300 "
                      >
                        IR PARA PAGAMENTO
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          ) : (
            <div>Lotes Encerrados</div>
          )}

          <ToastContainer
            theme="dark"
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </LayoutApplication>
    </>
  );
};

export default CheckOut;

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
      userId,
      orders,
    },
  };
};
