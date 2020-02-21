const fetchEventDailyData = () => {
    return fetch('http://localhost:5555/events/daily')
    .then((response) => {
      return response.json();
    });
};
const fetchEventHourlyData = () => {
    return fetch('http://localhost:5555/events/hourly')
    .then((response) => {
      return response.json();
    });
};
const fetchStatsDaily = () => {
  return fetch('http://localhost:5555/stats/daily')
  .then((response) => {
    return response.json();
  })
}
const fetchStatsHourly = () => {
  return fetch('http://localhost:5555/stats/hourly')
  .then((response) => {
    return response.json();
  })
}
const fetchPoiData = () => {
  return fetch('http://localhost:5555/poi')
  .then((response) => {
    return response.json();
  })
}
const fetchPoiAllMetrics = () =>{
  return fetch('http://localhost:5555/join/poi/stats_hourly')
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