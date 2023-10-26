import * as React from 'react';

const ContentItem = ({titleFilme, posterPath, date, voteAverage, description}: {
    titleFilme?: string;
    posterPath?: string;
    date?: string;
    voteAverage?: number;
    description?: string;
}) => {
    return (
        <main className="component-content content-item">
            <div className="container">
                <div className="thumb">
                    <img src={'https://image.tmdb.org/t/p/original' + posterPath}></img>
                </div>
                <div className="wrapper-content-item">
                    <h2>{titleFilme}</h2>
                    <p><span className="date">{date}</span></p>
                    <p><span className="description">{description}</span></p>
                </div>
            </div>
        </main>
    )
}

export default ContentItem;
