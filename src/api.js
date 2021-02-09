// const baseURL = 'http://127.0.0.1:8000/';
const baseURL = 'https://tractordraftback.herokuapp.com/';

const api = {    
    items: baseURL + 'api/items',
    users: baseURL + 'api/users',
    signin: baseURL + 'rest-auth/login/',
    signup: baseURL + 'rest-auth/registration/',
    profile: baseURL + 'rest-auth/user/',
    mediaItems: baseURL + 'media/items',
    mediaUsers: baseURL + 'media/users',
    managers: baseURL + 'api/fantasy/managers',
    matches: baseURL + 'api/fantasy/matches',
    gameweeks: baseURL + 'api/fantasy/gameweeks',
    tableteams: baseURL + 'api/fantasy/tableteams',
    tables: baseURL + 'api/fantasy/tables',
    leagues: baseURL + 'api/fantasy/leagues',    
    duels: baseURL + 'api/fantasy/duels',    
    league19teams: baseURL + 'api/fantasy/league19teams',    
    league19: baseURL + 'api/fantasy/league19',    
}

export default api;