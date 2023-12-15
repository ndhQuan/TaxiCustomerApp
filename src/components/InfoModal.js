import { useState } from "react";
import { StyleSheet } from "react-native";
import { Portal, Modal } from "react-native-paper";
import { Polyline } from "react-native-maps";

export default function InfoModal({ children }) {
  const [visible, setVisible] = useState(true);

  // const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
        style={{
          justifyContent: "flex-end",
        }}
      >
        {children}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    height: "30%",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
