import axios from 'axios';
import {useQuery, QueryClient, QueryClientProvider} from 'react-query';
import {Swiper, SwiperSlide} from 'swiper/react';

import Header from "../layout/Header";
import Footer from "../layout/Footer";

import 'swiper/css';

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
                <section className="section-most-popular">
                    <div className="section-title">
                        <h2 className="section-title__text">Mais populares</h2>
                    </div>
                    {results?.length > 0 && (
                        <Swiper
                            spaceBetween={15}
                            slidesPerView={3}
                            autoplay={true}
                        >
                            {results?.map((filme: any) => {
                                return (
                                    <SwiperSlide className="swiper-slide" key={filme.id}>
                                        <div className="card">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                                                alt={filme.title}
                                            />
                                            <div className="card__content">
                                                <h3 className="card__title">{filme.title}</h3>
                                                <p className="card__description">{filme.overview}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    )}
                </section>
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
