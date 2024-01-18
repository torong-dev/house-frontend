import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// 인테리어 데이터 가져오는 API
export const fetchInteriorData = async () => {
  try {
    const response = await instance.get("/api/interior");
    return response.data;
  } catch (error) {
    console.log("Error fetching interior dtat: ", error);
    throw error;
  }
};
