import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet /> {/*index.js에 있는 children을 보여줌 */}
      <Footer />
    </>
  );
}

export default App;
