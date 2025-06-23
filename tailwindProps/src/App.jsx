import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "../components/Card";

function App() {
  return (
    <>
      <h1 className="bg-orange-600 text-black p-4 rounded-xl mb-6">
        Tailwind Test
      </h1>
      <Card title="Hello world" place="europe" className="mb-4" />
      <Card title="Beautiful place" place={"india"} />
    </>
  );
}

export default App;
