import React, { useState, useEffect } from "react";
import {
  getPortfolioTickers,
  getPromiseArrayTickers,
  numberWithCommas
} from "../../helpers/portfolioMainHelper";
import { checkArray, findTickerIndex } from '../../helpers/sidebarHelper';
import classNames from "classnames";
import { data } from "autoprefixer";


export default function AssetTable(props) {
  const [dataToShow, setDataToShow] = useState([])
 
    let index = checkArray(props.selectedPortfolio, props.assetData["portfolios"])
  
    const moreInfo = (ticker) => {
      let dataToRender = {
        ticker : ticker, 
        portfolio : props.selectedPortfolio
      }
      props.setNewPopup("Ticker", dataToRender)
    }

    
      let DataToShow = (props.data.map(ticker => {
        let indexTicker = findTickerIndex(ticker.id, props.assetData["portfolios"][index]["tickers"])
        let totalBoughtPrice = 0;
        if(props.assetData["portfolios"][index]["tickers"][indexTicker]) {
          totalBoughtPrice = (props.assetData["portfolios"][index]["tickers"][indexTicker]["tickerAvgPrice"] * props.assetData["portfolios"][index]["tickers"][indexTicker]["tickerQuantity"]);
        } 
        let returnAmount = ticker.amount - totalBoughtPrice;
    
        const assetListClass = classNames("asset-profit", {
          "asset-profit-gain" : returnAmount > 0 ,
        });
    
        if (props.assetData["portfolios"][index]["tickers"][indexTicker]) {
          ticker.avgBoughtPrice = Number(props.assetData["portfolios"][index]["tickers"][indexTicker]["tickerAvgPrice"]); 
        }
    

      ticker.returnAmount = Number(returnAmount); 
      return (
        <tr>
          <td className="ticker-name">{ticker.company_name}</td>
          <td>{ticker.ticker}</td>
          <td>{`$${numberWithCommas(Math.round((ticker.price + Number.EPSILON) * 100) / 100)}`}</td>
          <td>{ticker.quantity}</td>
          <td>{`$${numberWithCommas(Math.round((ticker.amount + Number.EPSILON) * 100) / 100)}`}</td>
          <td className = {assetListClass}>{`$${numberWithCommas(Math.round((returnAmount + Number.EPSILON) * 100) / 100)}`}</td>
          <td><button className = "join-button" onClick={() => {moreInfo(ticker)}}>Info</button></td>
        </tr>
      )
    }))
    

  return (
    <div className="asset-table">
      <div>
        <span>Assets</span>
      </div>

      <div className="main-asset-table">
        <table>
          <thead>
            <tr>
              <th className="ticker-name th-start">Name</th>
              <th>Ticker</th>
              <th>Price</th>
              <th>Quanity</th>
              <th>Amount</th>
              <th>Return</th>
              <th className="th-end">View</th>
            </tr>
          </thead>
          <tbody>

              {DataToShow}
          </tbody>
         

        </table>
      </div>
    </div>
  );
}
