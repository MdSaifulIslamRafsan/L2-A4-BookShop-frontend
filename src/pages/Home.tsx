import Banner from "../component/home/Banner";
import Faq from "../component/home/Faq";
import FeaturedProducts from "../component/home/FeaturedProducts";

const Home = () => {
    return (
        <main style={{
        paddingTop: "35px",
        paddingBottom: "40px",

        }}>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <Faq></Faq>
        </main>
    );
};

export default Home;