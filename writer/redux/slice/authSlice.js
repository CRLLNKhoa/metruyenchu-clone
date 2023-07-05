import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  avatar: "https://static.cdnno.com/user/default/200.jpg",
  displayName: "",
  birthyear: "",
  isAdmin: false,
  role: 0,
  sex: 3,
  storyWritten: [],
  status: true,
  access_token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      const {
        name = "Người dùng mới",
        email = "",
        access_token = "",
        avatar = "https://static.cdnno.com/user/default/200.jpg",
        sex = 3,
        displayName = "",
        _id = "",
        isAdmin = false,
        storyWritten = [],
        status= true,
        birthyear= "",
        role=0
      } = action.payload;
      state.name = name;
      state.email = email;
      state.access_token = access_token;    
      state.id = _id;
      state.avatar = avatar;
      state.sex= sex;
      state.displayName = displayName;
      state.isAdmin = isAdmin;
      state.storyWritten=storyWritten;
      state.status=status;
      state.birthyear = birthyear;
      state.role = role;
    },
    resetAuth: (state) => {
        state.name = "";
        state.email = "";
        state.access_token = "";    
        state.id = "";
        state.avatar = "";
        state.sex= "";
        state.displayName = "";
        state.isAdmin = false;
        state.storyWritten=[];
        state.status=true;
        state.birthyear = "";
        state.role = 0;
    }
  },
});

// Action creators are generated for each case reducer function
export const { updateAuth,resetAuth } = authSlice.actions;

export default authSlice.reducer;
