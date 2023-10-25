import Header from "../layout/Header";
import {getFilmes} from './Home';
import Footer from "../layout/Footer";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import React from "react";
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

    const {
        isLoading,
        isError,
        data: {page, results, total_pages, total_results} = {},
    } = useQuery({
        queryKey: [],
        queryFn: () => getFilmes(),
    });

    const filmesData = {page, results, total_pages, total_results};

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    console.log(filmesData);
    return (
        <main className="page-content filmes">
            <div className="container">
                <div>
                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={age}
                            onChange={handleChange}
                            autoWidth
                            label="Age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Twenty</MenuItem>
                            <MenuItem value={21}>Twenty one</MenuItem>
                            <MenuItem value={22}>Twenty one and a half</MenuItem>
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
