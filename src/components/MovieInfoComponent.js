import React  from "react";
import styled from "styled-components";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 550px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 45px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
    color: black
  }
`;
const MovieInfo = styled.span`
  font-size: 35px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
    color: black
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;
const MovieInfoComponent = (props) => {
  const movieInfo = props.movie;
  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={IMGPATH + movieInfo?.poster_path} alt={movieInfo?.original_title} />
          <InfoColumn>
            <MovieName>
             <span>{movieInfo?.title}</span>
            </MovieName>
            <MovieInfo>
              Language: <span>{movieInfo?.original_language}</span>
            </MovieInfo>
            <MovieInfo>
              Rating: <span>{movieInfo?.vote_average}</span>
            </MovieInfo>
            <MovieInfo>
              Vote's: <span>{movieInfo?.vote_count}</span>
            </MovieInfo>
            <MovieInfo>
              Released Date: <span>{movieInfo?.release_date}</span>
            </MovieInfo>
            <MovieInfo>
            overview: <span>{movieInfo?.overview}</span>
            </MovieInfo>
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>X</Close>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );

  // return (
  //   <Container
  //     onClick={() => {
  //       props.onMovieSelect(id);
  //       window.scrollTo({ top: 0, behavior: "smooth" });
  //     }}
  //   >
  //     <CoverImage src={IMGPATH + backdrop_path} alt={original_title} />
  //     <MovieName>Title  :{original_title}</MovieName>
  //     <InfoColumn>
  //       <MovieInfo>Year : {release_date}</MovieInfo>
  //       <MovieInfo>Rating : {vote_average}</MovieInfo>
  //     </InfoColumn>
  //   </Container>
  // );
};
export default MovieInfoComponent;
