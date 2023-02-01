import React, { useEffect, useState } from "react";
import InfoTicket from "./InfoTicket";
import ListChair from "./ListChair";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  ContainerTicket,
  ContainerListChair,
  InfoTheater,
  NavLogo,
  Logo,
  Content,
  Nav,
  NavLogin,
} from "./TicketElement";
import { getInfoTicket, resetChair } from "../../reducers/ticket";
import { useParams } from "react-router-dom";
import UserInfo from "../../components/UserInfo";
import PageLoad from "../../components/PageLoad";
const Ticket = () => {
  const { tickets } = useSelector((state) => state.ticket);
  const { userLogin } = useSelector((state) => state.sig);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoTicket({ id, setLoading }));
    return () => {
      dispatch(resetChair());
    };
  }, []);
  if (tickets.length === 0) return;
  return (
    <Container>
      <Nav>
        <NavLogo to="/">
          <Logo />
          <Content>Exxmon</Content>
        </NavLogo>
        {userLogin === null ? null : (
          <NavLogin>
            <UserInfo userLogin={userLogin} />
          </NavLogin>
        )}
      </Nav>
      <ContainerTicket>
        {loading ? (
          <PageLoad />
        ) : (
          <>
            <ContainerListChair>
              <ListChair ticketChair={tickets.danhSachGhe} />
            </ContainerListChair>
            <InfoTheater>
              <InfoTicket
                ticketInfo={tickets.thongTinPhim}
                id={id}
                setLoading={setLoading}
              />
            </InfoTheater>
          </>
        )}
      </ContainerTicket>
    </Container>
  );
};

export default Ticket;
