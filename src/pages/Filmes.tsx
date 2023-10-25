import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Content = () => {
    return (
        <main className="page-content filmes">
            <div className="container">

            </div>
        </main>
    )
};

const Filmes = () => {
    return (
        <>
            <Header activePage={'filmes'}/>
            <Content/>
            <Footer/>
        </>
    );
};

export default Filmes;
