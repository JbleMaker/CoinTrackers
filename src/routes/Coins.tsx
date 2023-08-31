import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet-async";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 48px;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 15px;
  border-radius: 10px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
    padding: 15px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 15px;
`;
export const ChangeBtn = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 20px;
  left: 20px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  const isDark = useRecoilValue(isDarkAtom);
  const setMode = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setMode((prev) => !prev);

  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
        <ChangeBtn onClick={toggleDarkAtom}>
          {isDark ? "light" : "Dark"}
        </ChangeBtn>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                  alt={coin.name}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
