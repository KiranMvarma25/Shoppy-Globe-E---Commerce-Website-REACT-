import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App(){
  return (
    <>
      <Header /> {/* Renders the Header component at the top of every page. */}
      <Outlet /> {/* The Outlet component acts as a space, render's it's children component which are routed in it. */}
      <Footer /> {/* Renders the Footer component at the bottom of every page */}
    </>
  )
}


export default App;