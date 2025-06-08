import Navbar from "@/components/Navbar";
import AsideVehicles from "./components/AsideVehicles/AsideVehicles";
import MarksSection from "./components/MarksSection/MarksSection";
import ModelsSection from "./components/ModelsSection";
import Styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={Styles.Wrapper}>
      <Navbar />

      <div className={Styles.Container}>
        <div className={Styles.Column} style={{ flex: 1, minWidth: "400px" }}>
          <AsideVehicles />
        </div>
        <div className={Styles.Column} style={{ width: "400px" }}>
          <MarksSection />
          <ModelsSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
