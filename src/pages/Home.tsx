import axios from 'axios';
import {useQuery, QueryClient, QueryClientProvider} from 'react-query';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Autoplay, Grid} from 'swiper/modules';
import {Card, CardMedia, CardContent, Typography, Chip, Skeleton} from "@mui/material";
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import Header from "../layout/Header";
import Footer from "../layout/Footer";

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/grid";

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

export const getPopularFilmes = (page = 1) => {
    return axios.get(`https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${page}`, {
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

export const getActualFilmes = () => {
    return axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1`, {
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

export const getUpcomingFilmes = () => {
    return axios.get(`https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=1`, {
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

export const getTopRatedFilmes = () => {
    return axios.get('https://api.themoviedb.org/3/discover/movie?include_video=false&language=pt-BR&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200', {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWY4M2NkY2Q1YmE3ODYwNjEyMDRiYzA3NTgwOTY1ZSIsInN1YiI6IjY1Mzg1OWFlYzUwYWQyMDBlYjJlMWZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZPqxryArPsqtH8wkAtsVg_IUoh_0dltnSTeE_P6FrtQ'
        },
        params: {},
    }).then((response: any) => {
        if (response.status === 200) {
            return {
                ...response.data,
                results: response.data.results.slice(0, 12),
            };
        }
    });
};

const Content = () => {
    const {
        isLoading,
        data: {results} = {},
    } = useQuery({
        queryKey: ['actual'],
        queryFn: () => getActualFilmes(),
    });

    const {
        isLoading: isLoadingTopRated,
        data: {results: topRated} = {},
    } = useQuery({
        queryKey: ['topRated'],
        queryFn: () => getTopRatedFilmes(),
    });

    const {
        isLoading: isLoadingUpcoming,
        data: {results: upcoming} = {},
    } = useQuery({
        queryKey: ['upcoming'],
        queryFn: () => getUpcomingFilmes(),
    });

    return (
        <main className="page-content home">
            <div className="container">
                <section className="section-most-popular">
                    <div className="section-title">
                        <h2 className="section-title__text">Em Cartaz</h2>
                    </div>

                    {isLoading && (<div className="wrapper-loader">
                        <Skeleton animation="wave" variant="rounded" height={400}/>
                        <Skeleton animation="wave" variant="rounded" height={400}/>
                        <Skeleton animation="wave" variant="rounded" height={400}/>
                        <Skeleton animation="wave" variant="rounded" height={400}/>
                    </div>)}

                    {results?.length > 0 && (
                        <Swiper
                            spaceBetween={15}
                            slidesPerView={4}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            navigation={true}
                            modules={[Navigation, Autoplay]}
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

                <section className="section-most-rated">
                    <div className="section-title">
                        <h2 className="section-title__text">Mais bem avaliados</h2>
                    </div>

                    {isLoadingTopRated && (<div className="wrapper-movies">
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                    </div>)}

                    {topRated?.length > 0 && (
                        <div className="wrapper-movies">
                            {topRated?.map((filme: any) => {
                                return (
                                    <Card className="card" key={filme.id}>
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`}
                                            alt={filme.title}
                                        />
                                        <CardContent>
                                            <Chip icon={<StarRoundedIcon/>} label={filme.vote_average}/>
                                            <Typography variant="body1">
                                                {filme.title}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    )}
                </section>

                <section className="section-upcoming">
                    <div className="section-title">
                        <h2 className="section-title__text">Em Breve</h2>
                    </div>

                    {isLoadingUpcoming && (<div className="wrapper-movies">
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                        <Skeleton animation="wave" className="card" variant="rounded" height={290}/>
                    </div>)}

                    {upcoming?.length > 0 && (
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={5}
                            grid={{
                                rows: 2,
                                fill: "row",
                            }}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            pagination={true}
                            modules={[Pagination, Autoplay, Grid]}
                        >
                            {upcoming?.map((filme: any) => {
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
