import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import TextGenerator from "./components/TextGenerator";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App = () => {

  return <RouterProvider router={router} />
};

export default App;
