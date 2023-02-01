import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import SearchMovie from "./SearchMovie";
import NavBar from "./NavBar";
import ContentPage from "./ContentPage";
import { useDispatch } from "react-redux";
import { getMovieBanner } from "../../reducers/banner";
import { getListMovie } from "../../reducers/listMovie";
import { getShowTimeTheaterInfo } from "../../reducers/showTime";
import ShowTimes from "./ShowTimes";
import PageLoad from "../../components/PageLoad";
import {
  Container,
  ContainerHome,
  LeftHome,
  RightHome,
  LeftContent,
  LeftSide,
  LeftPage,
  ContainerShowTime,
} from "./HomePageElement";
const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const featchData = async () => {
      setLoading(true);
      const [ban, list, showt] = await Promise.all([
        dispatch(getMovieBanner()),
        dispatch(getListMovie()),
        dispatch(getShowTimeTheaterInfo()),
      ]);
      setLoading(false);
    };
    featchData();
  }, []);
  return (
    <>
      <Container>
        <ContainerHome>
          <LeftHome>
            <NavBar />
            <LeftContent>
              <LeftSide>
                <Sidebar />
              </LeftSide>
              <LeftPage>{loading ? <PageLoad /> : <ContentPage />}</LeftPage>
            </LeftContent>
          </LeftHome>
          <RightHome>{loading ? "" : <SearchMovie />}</RightHome>
        </ContainerHome>
        <ContainerShowTime>{loading ? "" : <ShowTimes />}</ContainerShowTime>
      </Container>
    </>
  );
};

export default HomePage;
