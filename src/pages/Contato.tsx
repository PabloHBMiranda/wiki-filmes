import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Content = () => {
    return (
        <main className="page-content contato">
            <div className="container">

            </div>
        </main>
    )
}

const Contato = () => {
    return (
        <>
            <Header activePage={'contato'}/>
            <Content/>
            <Footer/>
        </>
    );
};

export default Contato;
