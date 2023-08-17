import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "./api";
import { useOutletContext } from "react-router-dom";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface ICoinId {
  coinId: string;
}

const Chart = () => {
  const { coinId } = useOutletContext<ICoinId>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexCharts
          type="area"
          series={[
            {
              name: "close",
              data: data?.map((price) => Math.floor(Number(price.close))) ?? [],
            },
            {
              name: "open",
              data: data?.map((price) => Math.floor(Number(price.open))) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            chart: {
              toolbar: { show: false },
              height: 800,
              width: 500,
            },
            grid: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
