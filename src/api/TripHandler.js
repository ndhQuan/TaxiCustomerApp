import axios from "axios";
import { BASEAPI_URL } from "../utils/constant";

export async function getTripBookingInfo(token) {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASEAPI_URL}/api/TaxiType`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data.result;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateJourneyState(token, id, path, value) {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${BASEAPI_URL}/api/Journey/UpdatePartial/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        op: "replace",
        path: `/${path}`,
        value: value,
      },
    });
    if (res.status === 200) {
      return res.data.result;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getJourneyLog(token, id) {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASEAPI_URL}/api/Journey?id=${id}&isCustomer=true`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data.result;
    }
  } catch (error) {
    console.log(error);
  }
}