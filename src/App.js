import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: blue;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState(null);
  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    let response;
    if (searchString === "") {
      // Fetch all movies when the search query is empty
      response = await Axios.get(`http://192.168.100.9:4000/movies/movieslist`);
    } else {
      // Fetch the selected movie data based on the search query
      response = await Axios.get(
        `http://192.168.100.9:4000/movies/movieByName?MovieName=${searchString}`
      );
      if (response.data.length === 1) {
        // If the search returns a single movie, set it as the selectedMovie
        onMovieSelect(response.data[0]);
      } else {
        // If no movie matches the search, set selectedMovie to null
        onMovieSelect(null);
      }
    }
    updateMovieList(response.data);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  useEffect(() => {
    // Fetch all movies when the component mounts
    fetchData("");
  }, []);
  const matchedmovies = movieList.filter(item=> item.id === selectedMovie)
  .map(item=> {return item})
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/react-movie-app/moviesmama.svg" />
          movie'sMama
        </AppName>
        <SearchBox>
          <SearchIcon src="/react-movie-app/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie ? (
        matchedmovies.map((movie, index) => (
            <MovieInfoComponent
            key={index}
            movie={movie}
            onMovieSelect={onMovieSelect}
          />
        ))
      ) : (
        <MovieListContainer>
          {movieList?.length ? (
            movieList.map((movie, index) => (
              <MovieComponent
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          ) : (
            <Placeholder src="/react-movie-app/movie-icon.svg" />
          )}
        </MovieListContainer>
      )}
    </Container>
  );
}
export default App;
