import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory, fetchCoinTickers } from "./api";
import { useOutletContext, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";
import { styled } from "styled-components";

const PriceBox = styled.div`
  width: 100%;
  height: 35vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
  padding: 10px;
  box-sizing: border-box;
`;

const PriceInfo = styled.div`
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  span:first-child {
    font-size: 30px;
    color: rgba(255, 0, 0, 0.8);
  }
  span:last-child {
    font-size: 40px;
  }
`;

export interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
export interface ICoinId {
  coinId: string;
}

const Chart = () => {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery(["price", coinId], () =>
    fetchCoinTickers(coinId!)
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <PriceBox>
          <PriceInfo>
            <span>1H</span>
            <span>{data.quotes.USD.percent_change_1h}%</span>
          </PriceInfo>
          <PriceInfo>
            <span>6H</span>
            <span>{data.quotes.USD.percent_change_6h}%</span>
          </PriceInfo>
          <PriceInfo>
            <span>12H</span>
            <span>{data.quotes.USD.percent_change_12h}%</span>
          </PriceInfo>
          <PriceInfo>
            <span>1Day</span>
            <span>{data.quotes.USD.percent_change_24h}%</span>
          </PriceInfo>
          <PriceInfo>
            <span>1 Week</span>
            <span>{data.quotes.USD.percent_change_7d}%</span>
          </PriceInfo>
          <PriceInfo>
            <span>1 Month</span>
            <span>{data.quotes.USD.percent_change_30d}%</span>
          </PriceInfo>
        </PriceBox>
      )}
    </div>
  );
};

export default Chart;
