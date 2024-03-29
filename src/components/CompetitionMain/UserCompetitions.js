import React from 'react';
import UserCompetitionsItem from './UserCompetitionsItem'
import { findUserCompPortfolio, checkArray } from '../../helpers/sidebarHelper';
import { numberWithCommas } from "../../helpers/portfolioMainHelper"

export default function UserCompetitionsTable (props) {


  const user_competition = props.user_competitions.map((competition) => {
    const userCompPortfolio = findUserCompPortfolio(props.data.portfolios, competition);
    let profit = userCompPortfolio.total_value - competition.capital
    profit = `$${numberWithCommas(Math.round((profit + Number.EPSILON) * 100) / 100)}`
    return (
      <UserCompetitionsItem
      key={competition.id}
      id = {competition.id}
      name={competition.name}
      lobby = {competition.users}
      capital = {competition.capital}
      prizePool = {competition.prizePool}
      startDate = {competition.start_date}
      endDate = {competition.end_date}
      profit = {profit}
      avaliability = {competition.avaliability}
      setNewPopup = {props.setNewPopup}
      dataForPop = {props.user_competitions}
      />
    );
  });


    return (
      <div className="competition-user-list">
      <h1 className = "competition-titles">Users Competitions</h1>

      <div className = "Table-Div">
<table>
  <thead>
  <tr>
      <th className = "start-th" >Name</th>
      <th>Lobby</th>
      <th>Capital</th>
      <th>Prize Pool</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Profit Status</th>
      <th className = "end-th">Status</th>
    </tr>
  </thead>
  <tbody>
 {user_competition}
 </tbody>
  </table>
  </div>
       </div>
    )
}