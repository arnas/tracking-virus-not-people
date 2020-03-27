import cases from '../../data';
import {getHomePlacesNames} from "./futureRisk";

const E7 = 10000000;
const DURATION_START_LIMIT = 15;
const DURATION_END_LIMIT = 180;
const MAX_DISTANCE = 300;
const MAX_TIME = 7200;
const TIME_DIMINISHING_SPEED = 10;
const DISTANCE_DIMINISHING_SPEED = 20;
const W1 = 0.7;
const W2 = 0.2;
const W3 = 0.1;
const OTHER_FACTORS_RATIO = 0.3;

const getTop3Cases = (place) => {
    for (let i = 0; i < cases.length; i++) {
        const _case = cases[i];
        _case.distance = distance(_case.latitude, _case.longitude, place.location.latitudeE7 / E7, place.location.longitudeE7 / E7) * 1000;
        if (inRange(_case.timestamp, place.visitStartTs, place.visitEndTs)) {
            _case.timePassed = 0;
        } else {
            _case.timePassed = (place.visitStartTs - _case.timestamp) / 60;
            if (_case.timePassed < 0) {
                _case.timePassed = 10000;
            }
        }
    }
    return cases.sort((a, b) => {
        if (a.distance !== b.distance) {
            return a.distance - b.distance;
        } else {
            return a.timePassed - b.timePassed;
        }
    }).filter((a,idx) => idx < 3);
};

const distance = (lat1, lon1, lat2, lon2) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return dist;
    }
};

const inRange = (ts, tsStart, tsEnd) => ts >= tsStart && ts <= tsEnd;

const calculateHarmonicMean = (x, y) => 2 * x * y / (x + y);

const getDurationMultiplier = (duration) => Math.min(1.5 + Math.max(duration - DURATION_START_LIMIT, 0) / DURATION_END_LIMIT, 2);

const durationBetweenTs = (ts1, ts2) => Math.floor(Math.abs(ts2 - ts1) / 60);

const diminishingImportance = (raw, limit, speed) => {
    const x = (limit - Math.min(limit, raw)) / limit;
    return Math.max(0, Math.pow(Math.E, (speed * (x - 1))));
};

const process = (places) => {
    const componentsValues = [];
    const homePlacesNames = getHomePlacesNames(places);
    const existingComponents = new Set();
    
    for (let i = 0; i < places.length; i++) {
        if (homePlacesNames.indexOf(places[i].location.name) !== -1) {
            continue;
        }
        const duration = durationBetweenTs(places[i].visitStartTs, places[i].visitEndTs);
        const durationMultiplier = getDurationMultiplier(duration);
        const topCases = getTop3Cases(places[i]);
        for (let j = 0; j < 3; j++) {
            const distanceFactor = diminishingImportance(topCases[j].distance, MAX_DISTANCE, DISTANCE_DIMINISHING_SPEED);
            const timeFactor = diminishingImportance(topCases[j].timePassed, MAX_TIME, TIME_DIMINISHING_SPEED);
            const score = durationMultiplier * calculateHarmonicMean(distanceFactor, timeFactor) / 2;
            
            const identifier = `${places[i].address}-${topCases[j].address}-${places[i].visitEndTs}-${topCases[j].timestamp}`;
            
            if (existingComponents.has(identifier))
                continue;
            
            existingComponents.add(identifier);
            
            componentsValues.push({
                score,
                duration,
                durationMultiplier,
                distanceFactor,
                timeFactor,
                distance: topCases[j].distance,
                timePassed: topCases[j].timePassed,
                visitedLocation: places[i],
                case: topCases[j]
            });
        }
    }
    
    const componentsWith
    const sortedComponents = componentsValues.sort((a, b) => b.score - a.score).filter((a,idx) => a.visitedLocation.visitEndTs > a.case.timestamp).filter((a,idx) => idx < 3);
    const score = (W1 * sortedComponents[0].score + W2 * sortedComponents[1].score + W3 * sortedComponents[2].score) * (1 - OTHER_FACTORS_RATIO);

    const sumScore = sortedComponents.reduce((sum, c) => sum + c.score, 0);
    sortedComponents.forEach((c) => c.score = c.score / sumScore);
    return {
        score: score,
        places: sortedComponents,
    }
};

export default process;
