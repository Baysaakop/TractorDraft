import React from 'react';
import LeagueTable from '../components/LeagueTable';
import GameWeek from '../components/GameWeek';

function Home (props) {    
    return (
        <div>            
            <LeagueTable id={2} />
            <GameWeek id={2} />
        </div>
    )
}

export default Home;