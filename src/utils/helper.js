export function calculateInitialRegion(coords, onePoint = false) {
  let minLat = coords[0][0];
  let maxLat = coords[0][0];
  let minLng = coords[0][1];
  let maxLng = coords[0][1];

  coords.forEach((item) => {
    if (item[0] < minLat) {
      // minLat = coordinate.latitude;
      minLat = item[0];
    }
    if (item[0] > maxLat) {
      // maxLat = coordinate.latitude;
      maxLat = item[0];
    }
    if (item[1] < minLng) {
      // minLng = coordinate.longitude;
      minLng = item[1];
    }
    if (item[1] > maxLng) {
      // maxLng = coordinate.longitude;
      maxLng = item[1];
    }
  });

  let padding = 0.1;
  let latDelta;
  let lonDelta;
  if (onePoint) {
    latDelta = 0.01;
    lonDelta = 0.01;
  } else {
    latDelta = (maxLat - minLat) * (1 + padding);
    lonDelta = (maxLng - minLng) * (1 + padding);
  }

  const latitude = (minLat + maxLat) / 2;
  const longitude = (minLng + maxLng) / 2;
  let region = {
    latitude,
    longitude,
    latitudeDelta: latDelta,
    longitudeDelta: lonDelta,
  };
  return region;
}
