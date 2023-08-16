import { HashRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

function Router() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={process.env.PUBLIC_URL + "/"} element={<Coins />} />
        <Route path={process.env.PUBLIC_URL + "/:coinId"} element={<Coin />}>
          <Route path={process.env.PUBLIC_URL + "chart"} element={<Chart />} />
          <Route path={process.env.PUBLIC_URL + "price"} element={<Price />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default Router;
