import axios from "axios";
import { BASEAPI_URL } from "../utils/constant";

export async function login(phone, password) {
  const res = await axios({
    method: "POST",
    url: `${BASEAPI_URL}/api/auth/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      phone: phone,
      password: password,
    },
  });
  if (res.data) {
    if (res.data.statusCode === 200) return res.data.result;
    else {
      return res.data.errorMessages;
    }
  }
}

export async function signUp(name, email, phone, password) {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASEAPI_URL}/api/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: name,
        email: email,
        phoneNumber: phone,
        password: password,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function accountInfo(token, id) {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASEAPI_URL}/api/user/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data) {
      if (res.data.statusCode === 200) return res.data.result;
      else {
        return res.data.errorMessages;
      }
    }
  } catch (error) {
    console.log(error);
  }
}
