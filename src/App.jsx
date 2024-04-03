import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";
import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, useNavigate, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Comics from "./pages/ComicPages/Comics";
import CharactersDetail from "./pages/CharacterPages/CharactersDetails";
import ComicsDetails from "./pages/ComicPages/ComicsDetails";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<Comics />} />
        <Route
          path="/characterdetail/:characterID"
          element={<CharactersDetail />}
        />
        <Route path="/comicsdetail/:comicID" element={<ComicsDetails />} />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
