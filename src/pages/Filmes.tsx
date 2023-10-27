import Header from "../layout/Header";
import {getPopularFilmes} from './Home';
import Footer from "../layout/Footer";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import React, {useEffect, useState} from "react";

import {Box, FormControl, InputLabel, MenuItem, Select, Skeleton, Stack, Pagination} from '@mui/material';
import ContentItem from "../components/ContentItem";

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

const Content = () => {

    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any | string>(0);
    const [actualPage, setActualPage] = useState(1)
    const [movies, setMovies] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/genre_ids')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do servidor:', error);
            });
    }, []);

    const {
        isLoading,
        data: {page, results, total_pages, total_results} = {},
    } = useQuery({
        queryKey: ['popular-movies', actualPage],
        queryFn: () => getPopularFilmes(actualPage),
        onSuccess: (data) => {
            setTotalPages(data.total_pages);
        }
    });

    useEffect(() => {
        if (results && Array.isArray(results)) {
            setMovies(results);
        }
    }, [results])

    const handleSelectCategory = (categoryId: any) => {
        setSelectedCategory(categoryId);

        if (categoryId === 0) {
            setMovies(results);
            return;
        }

        const newMovies = results?.filter((movie: any) => {
            return movie.genre_ids.includes(categoryId);
        });

        setMovies(newMovies);
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setActualPage(value);
    }

    return (
        <main className="page-content filmes">
            <div className="container">
                <div className="wrapper-content">
                    <h1>Filmes Populares</h1>
                    <div className="wrapper-filters-filmes">
                        <FormControl className="form" sx={{m: 1, minWidth: 120}}>
                            <InputLabel className="wrapper-filters-filmes">Categorias</InputLabel>
                            <Select
                                className="select-filter-filmes"
                                value={selectedCategory}
                                onChange={(e) => handleSelectCategory(parseInt(e.target.value))}
                                label="Categorias"
                                sx={{
                                    color: 'white',
                                    borderColor: 'white'
                                }}
                            >
                                <MenuItem value="0">
                                    <em>Todas as Categorias</em>
                                </MenuItem>
                                {categories.map((category, index) => {
                                    return (
                                        <MenuItem value={category.id} key={index}>
                                            {category.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        {totalPages !== 0 && (
                            <Pagination count={totalPages} page={actualPage} onChange={handleChangePage}
                                        variant="outlined" shape="rounded"/>)}
                    </div>
                    <Box sx={{width: '100%'}}>
                        <Stack spacing={2}>
                            <div className="item-content">
                                {isLoading && (
                                    <>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                        <Skeleton animation="wave" className="card" variant="rounded" height={400}/>
                                    </>
                                )}
                                {movies?.length > 0 ? (
                                    <>
                                        {movies?.map((movie: any, index: any) => {
                                            return (
                                                <ContentItem
                                                    titleFilme={movie?.title}
                                                    posterPath={movie?.poster_path}
                                                    description={movie?.overview}
                                                    key={movie.id}
                                                />
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                        <h3 style={{color: 'white'}}>Nenhum filme encontrado.</h3>
                                    </>
                                )}
                            </div>
                        </Stack>
                    </Box>
                </div>
            </div>
        </main>
    )
};

const Filmes = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Header activePage={'filmes'}/>
                <Content/>
                <Footer/>
            </QueryClientProvider>
        </>
    );
};

export default Filmes;
