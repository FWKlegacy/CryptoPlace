import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../Context/CoinContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState([]);

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoins);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoins.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoins);
  }, [allCoins]);
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Lrgest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. sign up to
          explore more about cryptos
        </p>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            placeholder="search crypto.."
            onChange={inputHandler}
            value={input}
            list="coinlist"
            required
          />

          <datalist id="coinlist">
            {allCoins.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p style={{ textAlign: "right" }} className="market_cap">
            Market Cap
          </p>
        </div>
        {displayCoin &&
          displayCoin.slice(0, 10).map((item, index) =>
            item && item.image ? (
              <Link
                to={`/coin/${item.id}`}
                key={item.id || index}
                className="table-layout"
              >
                <p>{item.market_cap_rank}</p>
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "30px" }}
                  />
                  <p>{item.name + " - " + item.symbol}</p>
                </div>
                <p>
                  {currency.symbol} {item.current_price.toLocaleString()}
                </p>
                <p
                  style={{ textAlign: "center" }}
                  className={
                    item.price_change_percentage_24h > 0 ? "green" : "red"
                  }
                >
                  {Math.floor(item.price_change_percentage_24h * 100) / 100}
                </p>
                <p style={{ textAlign: "right" }} className="market_cap">
                  {currency.symbol} {item.market_cap.toLocaleString()}
                </p>
              </Link>
            ) : null
          )}
      </div>
    </div>
  );
};

export default Home;
