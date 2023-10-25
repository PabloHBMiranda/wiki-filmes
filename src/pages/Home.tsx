import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Content = () => {
    return (
        <div className="home-content">
            teste
        </div>
    )
};

const Home = () => {
    return (
        <>
            <Header activePage="home"/>
            <Content/>
            <Footer/>
        </>
    );
};

export default Home;
