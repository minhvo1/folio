import React from "react";
import SearchBar from "./SearchBar";
import UserIcon from "./UserIcon";
import axios from "axios";
import "./Header.scss";

export default function Header(props) {
  console.log(props)
  return (
    <div className="header">
      {props.userId !== 1 && (
        <div className="header_portfolio-info">
          <p className="user-name">Welcome, {props.userName}!</p>
          <p className="portfolio-name">{props.selectedPortfolio}</p>
          
        </div>
      )}
   {props.userId === 1 && (
        <div className="header_portfolio-info">
          Hello Admin
        </div>
      )}

      <SearchBar
        portfolios={props.portfolios}
        selectedPortfolio={props.selectedPortfolio}
      />
      <UserIcon logout={props.logout}/>
    </div>
  );
}
