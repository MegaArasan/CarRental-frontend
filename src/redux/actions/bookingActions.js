import axios from "axios";
import { API_URL } from "../../globalconstant";

export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const {token}=JSON.parse(localStorage.getItem("user"));
    await axios.post(`${API_URL}/api/bookings/bookcar`, reqObj,{headers:{
        Authorization:`Bearer ${token}`
      }}).then((data) => {
      console.log(data);
      localStorage.setItem("order", JSON.stringify(data));
    });

    dispatch({ type: "LOADING", payload: false });    
  } catch (error) {
    console.log(error);
    window.alert(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const {token}=JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(`${API_URL}/api/bookings/getallbookings`,{headers:{
      Authorization:`Bearer ${token}`
    }});
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    // window.alert(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
