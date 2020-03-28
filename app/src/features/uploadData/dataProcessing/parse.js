import JSZip from 'jszip';

const parse = async (file) => {
  const inputFile = await readInputContents(file);
  const zipFiles = await readZip(inputFile);
  const chosenFiles = chooseFiles(zipFiles);
  if (chosenFiles) {
    const parsedData = await Promise.all([
      readZipFile(chosenFiles[0]),
      readZipFile(chosenFiles[1]),
    ]);
    return processFilesData(parsedData);
  }
  return null;
};

const readInputContents = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (evt) => resolve(evt.target.result);
    reader.onerror = () => reject();
  });

const readZip = (zipFile) => {
  const zip = new JSZip();
  return zip.loadAsync(zipFile);
};

const chooseFiles = (zip) => {
  const months = [
    'DECEMBER',
    'NOVEMBER',
    'OCTOBER',
    'SEPTEMBER',
    'AUGUST',
    'JULY',
    'JUNE',
    'MAY',
    'APRIL',
    'MARCH',
    'FEBRUARY',
    'JANUARY',
  ];
  const chosenFiles = [];
  const files = zip.files;
  const keys = Object.keys(files);
  for (let i = 0; i < months.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if (files[keys[j]].name.endsWith('2020_' + months[i] + '.json')) {
        chosenFiles.push(files[keys[j]]);
        if (chosenFiles.length === 2) {
          return chosenFiles;
        }
        break;
      }
    }
  }
};

const readZipFile = (file) =>
  file.async('text').then((text) => JSON.parse(text));

const processFilesData = (files) => {
  const merged = [...files[0].timelineObjects, ...files[1].timelineObjects];
  return merged
    .filter(
      (obj) =>
        obj.hasOwnProperty('placeVisit') &&
        (obj.placeVisit.placeConfidence === 'HIGH_CONFIDENCE' ||
          obj.placeVisit.placeConfidence === 'MEDIUM_CONFIDENCE')
    )
    .map((obj) => ({
      location: obj.placeVisit.location,
      visitStartTs: obj.placeVisit.duration.startTimestampMs / 1000,
      visitEndTs: obj.placeVisit.duration.endTimestampMs / 1000,
    }));
};

export default parse;
