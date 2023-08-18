// import { getDefaultNormalizer } from "@testing-library/react";
import react, { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
let API_key = "&api_key=db95773a7fb212ba790d71f6adac0e7e";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["Popular", "Theatre", "Kids", "Drama", "Comedie"];
const Main = () => {
    const [movieData, setData] = useState([]);
    const [url_set, setUrl] = useState(url);
    const [search, setSearch] = useState();
    useEffect(() => {
        fetch(url_set).then(res => res.json()).then(data => {
            setData(data.results);
        });
    }, [url_set])

    const getData = (movieType) => {
        if (movieType === "Popular") {
            url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
        }
        if (movieType === "Theatre") {
            url = base_url + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + API_key;
        }
        if (movieType === "Kids") {
            url = base_url + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" + API_key;
        }
        if (movieType === "Drama") {
            url = base_url + "/discover/movie?with_genres=18&primary_release_year=2014" + API_key;
        }
        if (movieType === "Comedie") {
            url = base_url + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" + API_key;
        }
        setUrl(url);

    }
    const searchMovie = (evt) => {
        if (evt.key === "Enter") {
            url = base_url + "/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" + search;
            setUrl(url);
            setSearch(" ");
        }
    }
    return (
        <>
            <div className="header">
                <nav>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-bars"></i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#" name="Popular" onClick={(e) => { getData(e.target.name) }} >Popular</a>
                            <a class="dropdown-item" href="#" name="Theatre" onClick={(e) => { getData(e.target.name) }} >Theatre</a>
                            <a class="dropdown-item" href="#" name="Kids" onClick={(e) => { getData(e.target.name) }} >Kids</a>
                            <a class="dropdown-item" href="#" name="Drama" onClick={(e) => { getData(e.target.name) }} >Drama</a>
                            <a class="dropdown-item" href="#" name="Comedie" onClick={(e) => { getData(e.target.name) }} >Comedie</a>
                        </div>
                    </div>
                </nav>
                <form>
                    <div className="search-btn">
                        <input type="text" placeholder="Enter Movie Name"
                            className="inputText" onChange={(e) => { setSearch(e.target.value) }}
                            value={search} onKeyPress={searchMovie}>
                        </input>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </div>
            <div className="container">
                {
                    (movieData.length === 0) ? <p className="notfound">Not Found</p> : movieData.map((res, pos) => {
                        return (
                            <Card info={res} key={pos} />
                        )
                    })
                }
            </div>
        </>
    )
}
export default Main;