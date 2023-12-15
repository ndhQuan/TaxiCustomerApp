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
    const res = await axios.post(BASEAUTH_URL + "register", {
      name: name,
      email: email,
      phoneNumber: phone,
      password: password,
    });
    return res.data;
  } catch {
    return null;
  }
}
