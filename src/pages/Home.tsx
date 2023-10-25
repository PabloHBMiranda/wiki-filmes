import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Content = () => {
    return (
        <main className="page-content home">
            <div className="container">

            </div>
        </main>
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
