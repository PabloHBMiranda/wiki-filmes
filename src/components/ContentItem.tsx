import * as React from 'react';

const ContentItem = ({titleFilme, posterPath, date, description}: {
    titleFilme?: string;
    posterPath?: string;
    date?: string;
    description?: string;
}) => {

    const data = new Date('2023-09-29');
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em zero
    const ano = data.getFullYear();

    date = `${dia}/${mes}/${ano}`;

    return (
        <main className="component-content content-item">
            <div className="container">
                <img src={'https://image.tmdb.org/t/p/w500' + posterPath}></img>
                <div className="wrapper-content-item">
                    <h2>{titleFilme}</h2>
                    <p><span className="description">{description}</span></p>
                    <p><span className="date">Lançamento: {date}</span></p>
                </div>
            </div>
        </main>
    )
}

export default ContentItem;
