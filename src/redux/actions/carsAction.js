import axios from "axios";
import { API_URL } from "../../globalconstant.js";

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const {token}=JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(`${API_URL}/api/cars/getallcars`,{ headers:{ Authorization:`Bearer ${token}`}});
    dispatch({ type: "GET_ALL_CARS", payload: response.data.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    window.alert(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
