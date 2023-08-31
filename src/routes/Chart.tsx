import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "./api";
import { useOutletContext } from "react-router-dom";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

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
  const { coinId } = useOutletContext<ICoinId>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data:
                data?.map((price) => [
                  new Date(price.time_open).getTime(), // 날짜
                  parseFloat(price.open), // 시작가
                  parseFloat(price.high), // 최고가
                  parseFloat(price.low), // 최저가
                  parseFloat(price.close), // 종가
                ]) ?? [],
            },
          ]}
          options={{
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#DF7D46", // 상승 시 색상
                  downward: "#3C90EB", // 하락 시 색상
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
