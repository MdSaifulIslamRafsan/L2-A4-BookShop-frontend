import Banner from "../component/home/Banner";
import Faq from "../component/home/Faq";

const Home = () => {
    return (
        <main style={{
        paddingTop: "35px",
        paddingBottom: "40px",

        }}>
            <Banner></Banner>
            <Faq></Faq>
        </main>
    );
};

export default Home;