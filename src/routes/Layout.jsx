import { Fragment } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Fragment>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-100 flex items-center justify-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Layout;
