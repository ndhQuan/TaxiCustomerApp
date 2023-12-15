import axios from "axios";
import { decode } from "@mapbox/polyline"; //please install this package before running!
import { BASE_GOOGLEMAPAPI_URL, GM_ID } from "../utils/constant";

export async function getGeocode(place_id) {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_GOOGLEMAPAPI_URL}/geocode/json?place_id=${place_id}&key=${GM_ID}`,
    });
    console.log(res);
    if (res.data.results) {
      return res.data.results[0].geometry.location;
    }
  } catch {
    console.log(res.data.error_message);
  }
}

export const getDirections = async (startLoc, destinationLoc) => {
  try {
    let res = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${startLoc}&destination=place_id:${destinationLoc}&key=${GM_ID}`
    );
    if (res.data.status == "OK") {
      let points = decode(res.data.routes[0].overview_polyline.points);
      let distance = res.data.routes[0].legs[0].distance.value;
      console.log(points);
      console.log(distance);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      return { coords, distance };
    }
  } catch (error) {
    return error;
  }
};

export function DecodePoly(polyCode){
  return decode(polyCode)
}
