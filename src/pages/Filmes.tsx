import Header from "../layout/Header";
import {getPopularFilmes} from './Home';
import Footer from "../layout/Footer";
import {QueryClientProvider, QueryClient, useQuery} from "react-query";
import React, {useEffect, useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import ContentItem from "../components/ContentItem";
// import ContentItem from "../components/ContentItem";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: '20px',
    textAlign: 'center',
    color: '#828588'
}));

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
    const [selectedCategory, setSelectedCategory] = useState<any | string>('0');

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
        data: {page, results, total_pages, total_results} = {},
    } = useQuery({
        queryKey: [],
        queryFn: () => getPopularFilmes(),
    });

    const filmesData = {page, results, total_pages, total_results};

    const [filteredResults, setFilteredResults] = useState<{
        title?: string,
        poster_path?: string,
        release_date?: string,
        overview?: string,
        vote_average?: number
    }[]>([]);

    useEffect(() => {
        var filters = filmesData.results;

        if (selectedCategory !== '0') {
            filters = filters.filter((result: { genre_ids: number[] }) => {
                return result.genre_ids.some(genreId => genreId === selectedCategory);
            });
        }
        setFilteredResults(filters);
    }, [selectedCategory]);


    const handleChange = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <main className="page-content filmes">
            <div className="container">
                <div className="wrapper-content">
                    <h1>Filmes em Cartaz</h1>
                    <div className="wrapper-filters-filmes">
                        <FormControl className="form" sx={{m: 1, minWidth: 120}}>
                            <InputLabel className="wrapper-filters-filmes">Categorias</InputLabel>
                            <Select
                                className="select-filter-filmes"
                                value={selectedCategory}
                                onChange={handleChange}
                                autoWidth
                                label="Categorias"
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
                    </div>
                    <Box sx={{width: '100%'}}>
                        <Stack spacing={2}>
                            {filteredResults && filteredResults.length > 0 ? (
                                <div className="item-content">
                                    {filteredResults.map((result, index) => {
                                        return (
                                        <ContentItem
                                            titleFilme={result.title}
                                            posterPath={result.poster_path}
                                            date={result.release_date}
                                            description={result.overview}
                                            key={index}
                                        />
                                    )})}
                                </div>
                            ) : (
                                <Item>
                                    <p>Nenhum resultado encontrado.</p>
                                </Item>
                            )}
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
