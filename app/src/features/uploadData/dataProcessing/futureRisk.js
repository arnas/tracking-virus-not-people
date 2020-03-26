const QUARANTINE_START = 1584309600;

const getFutureRiskScores = places => {
  const homePlacesNames = getHomePlacesNames(places);
  console.log("HOME/WORK Places:");
  console.log(homePlacesNames);

  const quarantinePlaces = places.filter(
    p => p.visitStartTs > QUARANTINE_START
  );
//   const timeSpentAtHome = quarantinePlaces
//     .filter(p => homePlacesNames.indexOf(p.location.name) !== -1)
//     .reduce((sum, p) => sum + p.timeSpent, 0);
  const daysFromQuarantineStart =
    (new Date().getTime() / 1000 - QUARANTINE_START) / 86400;

  const publicPlaces = quarantinePlaces.filter(
    p =>
      !p.location.address.includes(p.location.name) &&
      homePlacesNames.indexOf(p.location.name) === -1
  );
  const hoursSpentAtPublicPlaces = publicPlaces.reduce(
    (sum, p) => sum + p.timeSpent,
    0
  );
  const percentageAtHome =
    ((12 * daysFromQuarantineStart - hoursSpentAtPublicPlaces) /
      (12 * daysFromQuarantineStart)) *
    100;

  console.log("Public places:");
  console.log(publicPlaces);

  return {
    percentageAtHome,
    visitedPublicPlacesCount: publicPlaces.length,
    hoursSpentAtPublicPlaces,
    publicPlaces
  };
};

const getHomePlacesNames = places => {
  places.forEach(place => {
    place.timeSpent = (place.visitEndTs - place.visitStartTs) / 3600;
  });
  const names = places.filter(p => p.timeSpent > 4).map(p => p.location.name);
  const uniqueNames = Array.from(new Set(names));

  const uniquePlaces = removeDuplicatesByName(places);
  const totalTimeSpent = uniquePlaces.reduce(
    (sum, place) => sum + place.timeSpent,
    0
  );
  uniquePlaces.forEach(
    p => (p.percentageTimeSpent = p.timeSpent / totalTimeSpent)
  );
  return uniquePlaces
    .filter(
      p =>
        p.percentageTimeSpent > 0.1 &&
        uniqueNames.indexOf(p.location.name) !== -1
    )
    .map(p => p.location.name);
};

const removeDuplicatesByName = places => {
  const placesByName = {};
  for (let i = 0; i < places.length; i++) {
    if (!placesByName.hasOwnProperty(places[i].location.name)) {
      placesByName[places[i].location.name] = places[i];
    } else {
      placesByName[places[i].location.name].timeSpent += places[i].timeSpent;
    }
  }
  return Object.values(placesByName);
};

export default getFutureRiskScores;

export {
  getHomePlacesNames
}
