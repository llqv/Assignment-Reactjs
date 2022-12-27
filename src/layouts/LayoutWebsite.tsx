import { Outlet } from "react-router-dom";
import Footer from "../components/home/footer";
import Header from "../components/home/header";
const LayoutWebsite = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default LayoutWebsite;
