const proxyurl = "https://cors-anywhere.herokuapp.com/";

const fetchEventDailyData = () => {
    return fetch(proxyurl + 'https://server-eq-works.herokuapp.com/events/daily')
    .then((response) => {
      return response.json();
    });
};

const fetchEventHourlyData = () => {
    return fetch(proxyurl + 'https://server-eq-works.herokuapp.com/events/hourly')
    .then((response) => {
      return response.json();
    });        
};

const fetchStatsDaily = () => {
  return fetch(proxyurl + 'https://server-eq-works.herokuapp.com/stats/daily')
  .then((response) => {
    return response.json();
  })
}

const fetchStatsHourly = () => {
  return fetch(proxyurl + 'https://server-eq-works.herokuapp.com/stats/hourly')
  .then((response) => {
    return response.json();
  })
}
const fetchPoiData = () => {
  return fetch(proxyurl + 'https://server-eq-works.herokuapp.com/poi')
  .then((response) => {
    return response.json();
  })
}

const fetchPoiAllMetrics = () =>{
  return fetch(proxyurl + 'https://server-eq-works.herokuapp.com/join/poi/stats_hourly')
  .then((response) => {
    return response.json();
  })
}

export {
    fetchEventHourlyData,
    fetchEventDailyData,
    fetchStatsDaily,
    fetchPoiData,
    fetchStatsHourly,
    fetchPoiAllMetrics
};