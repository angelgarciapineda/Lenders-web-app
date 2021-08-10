import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Iniciar sesión",
    path: "/signin",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Registrase",
    path: "/signup",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Crear productos",
    path: "/products",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Lista de productos",
    path: "/listproducts",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
];
