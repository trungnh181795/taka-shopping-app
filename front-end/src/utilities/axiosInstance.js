import axios from "axios";

const deviceIdFromStorage = localStorage.getItem("deviceId")
  ? JSON.parse(localStorage.getItem("deviceId"))
  : "";

const userTokensFromStorage = localStorage.getItem("userTokens")
  ? JSON.parse(localStorage.getItem("userTokens"))
  : {};

const refreshToken = userTokensFromStorage?.refresh?.token;
console.log('rf', refreshToken)

const instance = axios.create({
  baseURL: `http://137.184.207.13:5000/v1`,
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('res', response)

    return response;
  },
  (error) => {
    console.dir(error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response.status === 401) {
      console.log('tokens', refreshToken)
      console.log('ids', deviceIdFromStorage)

      const payload = {
          refreshtoken: refreshToken,
          deviceId: deviceIdFromStorage
      }

      console.log('payload', payload)
      instance.post(
        "/auth/refresh-tokens",
        payload
      )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        localStorage.clear();
        document.location.href = "/signin";
      })

      // localStorage.setItem("userTokens", JSON.stringify(userTokens));
      // localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // localStorage.setItem("deviceId", JSON.stringify(deviceId));


    }

    return Promise.reject(error);
  }
);

export { instance };
