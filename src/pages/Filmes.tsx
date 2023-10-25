import Header from "../layout/Header";
import {getFilmes} from './Home';
import Footer from "../layout/Footer";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import React, {useEffect, useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
    const [selectedCategory, setSelectedCategory] = useState<any | string>('Todas as Categorias');

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
        isError,
        data: {page, results, total_pages, total_results} = {},
    } = useQuery({
        queryKey: [],
        queryFn: () => getFilmes(),
    });

    const filmesData = {page, results, total_pages, total_results};

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <main className="page-content filmes">
            <div className="container">
                <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel className="wrapper-filters-filmes">Categorias</InputLabel>
                        <Select
                            className="select-filter-filmes"
                            value={selectedCategory}
                            onChange={handleChange}
                            autoWidth
                            label="Categorias"
                        >
                            <MenuItem value="Todas as Categorias">
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
