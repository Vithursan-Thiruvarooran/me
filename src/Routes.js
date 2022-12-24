import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
const MainPage = lazy(() => import("./MainPage"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const Loader = lazy(() => import("./components/Loader/Loader"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const StickyBar = lazy(() => import("./components/StickyBar/StickyBar"));

const Router = () => {
  return (
    <>
      <Loader />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MainPage/>} />
      </Routes>
      <StickyBar></StickyBar>
      <Footer />
    </>
  );
};

export default Router;