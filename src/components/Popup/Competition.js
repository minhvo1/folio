import React, { Fragment, useState } from "react";
import "./Popup.scss";
import {findCompetitionById} from "../../helpers/sidebarHelper";
import {
  getPortfolioTickers,
  getPromiseArrayTickers,
  numberWithCommas
} from "../../helpers/portfolioMainHelper";

export default function Competition(props) {
    const competition1 = findCompetitionById(props.info, props.competitions)  
  
    const users = props.competitions[props.info-1]["portfolios"].map((portfolios) => {
      return <li key = {portfolios.id}>{portfolios.name}</li>;
    });
  
    let dateEnd = new Date(competition1.end_date);
    dateEnd = `${dateEnd.getMonth()+ 1}/${dateEnd.getDate()}/${dateEnd.getFullYear()}` 
   
    const [error, setError] = useState("");
  
    function validate() {
    
      props.setMenu("New Portfolio")
      
    }
  
    if (props.avaliability === false) {
        setError("Competition is currently not avaliable.")
        props.setMenu("Competitions")
    }
  
    return (
      <div className="competition-info">
          <div className="competition-info-box">
            <h2>Competition Name</h2>
            <br />
           <h2 className = "title">{competition1.name}</h2>
          </div>

          <div className="competition-info-box">
            <h2>Prize Pool</h2>
            <br />
       
           <h2 className = "title">{`$${numberWithCommas(Math.round((competition1.prizePool + Number.EPSILON) * 100) / 100)}`}</h2>
          </div>

          <div className="competition-info-box">
            <h2>End Date</h2>
            <br />
           <h2 className = "title">{dateEnd}</h2>
          </div>
          <div className="competition-info-box ">
          <h2>Lobby</h2>
            <br />
        
           <h2 className = "title"><ul>{users}</ul></h2>
           </div>


          <div className="competition-info-box">
            <h2>User</h2>

           {competition1.userComp === true && <p>🟢 In lobby</p>}
           {competition1.userComp === false && <p>🔴 Not participating</p>}
          </div>

          {competition1.userComp === false && 
          <div className="competition-info-box">
         <button className = "join-button" onClick={validate} >Join</button>
          </div>}

          {competition1.userComp === true && 
             <div className="competition-info-box">
             <h2>User Performance </h2>
             <br />
            <h2 className = "title">100</h2>
           </div>}

        <section className="error-message">{error}</section>

      </div>
    );
  }
