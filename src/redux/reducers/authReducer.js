const initialState={
    token:null,
    user:null

}

export const authReducer=(state=initialState,action)=>{
    switch (action.type) {
        case "Login_success": {
          return {
            ...state,
             token: action.payload.token,
        user: action.payload.user,
          };
        }
        case "LOGOUT":
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
      }
}