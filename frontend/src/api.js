import axios from "axios";
// import { logout } from "./shared/utils/auth";

// const apiClient = axios.create({
//   baseURL: "http://localhost:4000/api",
//   timeout: 1000,
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const userDetails = localStorage.getItem("user");

//     if (userDetails) {
//       const token = JSON.parse(userDetails).token;
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

// public routes

// export const login = async (data) => {
//   try {
//     return await apiClient.post("/auth/login", data);
//   } catch (exception) {
//     return {
//       error: true,
//       exception,
//     };
//   }
// };

// export const register = async (data) => {
//   try {
//     return await apiClient.post("/auth/register", data);
//   } catch (exception) {
//     return {
//       error: true,
//       exception,
//     };
//   }
// };

// secure routes
export const sendFriendInvitation = async (data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await axios.post(
      `/api/friend-invitation/invite`,
      data,
      { withCredentials: true },
      config
    );
  } catch (exception) {
    // checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const acceptFriendInvitation = async (data) => {
  try {
    return await axios.post("/api/friend-invitation/accept", data);
  } catch (exception) {
    // checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const rejectFriendInvitation = async (data) => {
  try {
    return await axios.post("/api/friend-invitation/reject", data);
  } catch (exception) {
    // checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const addCluster = async (data) => {
  console.log(data);
  try {
    return await axios.post(
      "/api/v1/addCluster",
      data,
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};
export const addGroup = async (data) => {
  console.log(data);
  try {
    const data1 = await axios.post(
      "/api/v1/addGroup",
      data,
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data1);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};
export const getGroup = async () => {
  try {
    return await axios.get("/api/v1/getGroup", { withCredentials: true });
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

// const checkResponseCode = (exception) => {
//   const responseCode = exception?.response?.status;

//   if (responseCode) {
//     responseCode === 401 || responseCode === 403;
//   }
// };
