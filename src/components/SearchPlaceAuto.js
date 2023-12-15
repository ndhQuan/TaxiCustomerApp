import React from "react";
import { Text, View, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GM_ID } from "../utils/constant";

navigator.geolocation = require("react-native-geolocation-service");

const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

export default function GooglePlacesInput({
  placeholder,
  current,
  isEnd,
  onGetLocation,
}) {
  const homePlace = {
    description: "Vị trí của bạn",
    geometry: {
      location: {
        lat: 10.829117,
        lng: 106.679486,
      },
    },
  };

  if (current) {
    homePlace.geometry.location.lat = current.lat;
    homePlace.geometry.location.lng = current.lng;
  }

  return (
    <View
      style={{
        padding: 12,
        height: 200,
        width: "90%",
      }}
    >
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={(row) => row.description} // custom description render
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          onGetLocation(data.place_id);
          console.log(data, details);
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: GM_ID,
          language: "vi", // language of the results
          components: "country:vn", // default: 'geocode'
        }}
        styles={{
          textInputContainer: {
            width: "100%",
          },
          description: {
            fontWeight: "bold",
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        // GooglePlacesSearchQuery={{
        //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        //   rankby: "distance",
        //   types: "food",
        // }}
        // filterReverseGeocodingByTypes={[
        //   "locality",
        //   "administrative_area_level_3",
        // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        // predefinedPlaces={isEnd ? [] : [homePlace]}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        renderLeftButton={() => {}}
        // renderRightButton={() => <Text>Custom text after the input</Text>}
      />
    </View>
  );
}
