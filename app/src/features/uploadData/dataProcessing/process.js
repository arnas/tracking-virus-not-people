import cases from '../../data';
import {getHomePlacesNames} from './futureRisk';

const E7 = 10000000;
const max_probability_of_contact = 0.2;
const max_probability_of_visiting_after_infected = 0.005;
const max_probability_of_visiting_unsuspicious_shop = 0.007;

const logistic_probability_same_time = (number_of_minutes) => {
  const K = max_probability_of_contact;
  const P = 0.01;
  const r = 0.1;
  return (K * P) / (P + (K - P) * Math.pow(Math.E, -r * number_of_minutes));
};

const logistic_probability_same_place_from_initial = (number_of_minutes) => {
  const K = 0.001;
  const P = max_probability_of_visiting_after_infected;
  const r = 0.0001;
  return (K * P) / (P + (K - P) * Math.pow(Math.E,-r * number_of_minutes));
};

const logistic_probability_visiting_a_shop = (number_of_minutes) => {
  const K = max_probability_of_visiting_unsuspicious_shop;
  const P = 0.001;
  const r = 0.07;
  return (K * P) / (P + (K - P) * Math.pow(Math.E,-r * number_of_minutes));
};

const distance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist * 1000;
  }
};

const getTimeTogether = (_case, visit) => {
  if (visit.visitStartTs <= _case.timestamp) {
    return _case.timestamp + _case.duration < visit.visitEndTs ? _case.duration : visit.visitEndTs - _case.timestamp;
  } else if (visit.visitStartTs < _case.timestamp + _case.duration) {
    return _case.timestamp + _case.duration > visit.visitEndTs ? visit.visitEndTs - visit.visitStartTs : _case.timestamp + _case.duration - visit.visitStartTs;
  }
  return 0;
};

const process = (visits) => {
  const twoWeeksAgoTs = new Date().getTime() / 1000 - 14 * 24 * 60 * 60;
  const twoWeeksVisits = visits.filter((visit) => visit.visitEndTs > twoWeeksAgoTs);
  const homePlacesNames = getHomePlacesNames(visits);
  let relevantPlaces = [];
  for (let i = 0; i < twoWeeksVisits.length; i++) {
    // Ignore home places
    if (twoWeeksVisits[i].location.address.includes(twoWeeksVisits[i].location.name) &&
        homePlacesNames.indexOf(twoWeeksVisits[i].location.name) !== -1) {
      continue;
    }

    const probs = [];
    for (let j = 0; j < cases.length; j++) {
      if (!cases[j].duration) {
        cases[j].duration = 60 * 1000;
      }

      // Ignore cases far away
      if (distance(cases[j].latitude, cases[j].longitude, twoWeeksVisits[i].location.latitudeE7 / E7, twoWeeksVisits[i].location.longitudeE7 / E7) > 50) {
        continue;
      }

      // Ignore if visited before infected person
      if (twoWeeksVisits[i].visitEndTs < cases[j].timestamp) {
        continue;
      }

      // Ignore if short visit
      if (twoWeeksVisits[i].visitEndTs - twoWeeksVisits[i].visitStartTs < 3 * 60) {
        continue;
      }

      let timeTogether = getTimeTogether(cases[j], twoWeeksVisits[i]) / 60;
      if (timeTogether > 0) {
        probs.push(1 - logistic_probability_same_time(timeTogether));
      } else {
        probs.push(1 - logistic_probability_same_place_from_initial((twoWeeksVisits[i].visitStartTs - cases[j].timestamp) / 60));
      }

      if (!twoWeeksVisits[i].case || twoWeeksVisits[i].case.timestamp < cases[j].timestamp) {
        twoWeeksVisits[i].case = cases[j];
      }
    }
    probs.push(1 - logistic_probability_visiting_a_shop((twoWeeksVisits[i].visitEndTs - twoWeeksVisits[i].visitStartTs) / 60));
    twoWeeksVisits[i].score = 1 - probs.reduce((a, b) => a * b);
    relevantPlaces.push(twoWeeksVisits[i]);
  }

  relevantPlaces = relevantPlaces.filter((v) => v.score > 0).sort((a, b) => b.score - a.score);
  const finalScore = 1 - relevantPlaces.reduce((a, b) => a * (1 - b.score), 1);

  return {
    score: finalScore,
    places: relevantPlaces,
  };
};

export default process;
