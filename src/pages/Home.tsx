import axios from 'axios';
import {useQuery, QueryClient, QueryClientProvider} from 'react-query';

import Header from "../layout/Header";
import Footer from "../layout/Footer";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 1000 * 60 * 60 * 24,
        },
    },
});

const getFilmes = () => {
    return axios.get('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1', {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWY4M2NkY2Q1YmE3ODYwNjEyMDRiYzA3NTgwOTY1ZSIsInN1YiI6IjY1Mzg1OWFlYzUwYWQyMDBlYjJlMWZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZPqxryArPsqtH8wkAtsVg_IUoh_0dltnSTeE_P6FrtQ'
        },
        params: {},
    }).then((response: any) => {
        if (response.status === 200) {
            return response.data;
        }
    });
};

const Content = () => {
    const {
        isLoading,
        isError,
        data: {page, results, total_pages, total_results} = {},
    } = useQuery({
        queryKey: [],
        queryFn: () => getFilmes(),
    });

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
            <QueryClientProvider client={queryClient}>
                <Content/>
            </QueryClientProvider>
            <Footer/>
        </>
    );
};

export default Home;
