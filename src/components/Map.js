import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function Map({ children, region, mapRef, fl }) {
  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={fl ? fl : styles.mapFull}
      initialRegion={region}
      showsUserLocation={true}
    >
      {children}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapFull: {
    flex: 1,
  },
});
