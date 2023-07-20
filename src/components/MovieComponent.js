import React from "react";
import styled from "styled-components";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const MovieComponent = (props) => {
  const { original_title, release_date, id, vote_average, backdrop_path } = props.movie;
  const releaseDate = new Date(release_date)
  const year = releaseDate.getFullYear();
  return (
    <MovieContainer
      onClick={() => {
        props.onMovieSelect(id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <CoverImage src={IMGPATH + backdrop_path} alt={original_title} />
      <MovieName>{original_title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year : {year}</MovieInfo>
        <MovieInfo>Rating : {vote_average}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
};
export default MovieComponent;
