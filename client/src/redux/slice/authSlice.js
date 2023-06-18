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
  seenStory: [],
  storyWritten: [],
  status: true,
  access_token: "",
  flower: {
    quantity: 0,
  },
  candy: {
    quantity: 0,
  },
  vip: {},theme: 6
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
        seenStory = [],
        status = true,
        birthyear = "",
        role = 0,
        asset = {},
        vip= false
      } = action.payload;
      state.name = name;
      state.email = email;
      state.access_token = access_token;
      state.id = _id;
      state.avatar = avatar;
      state.sex = sex;
      state.displayName = displayName;
      state.isAdmin = isAdmin;
      state.storyWritten = storyWritten;
      state.seenStory = seenStory;
      state.status = status;
      state.birthyear = birthyear;
      state.role = role;
      state.vip = vip;
      state.candy.quantity = asset.candy.quantity
      state.flower.quantity = asset.flower.quantity
    },
    payment: (state,action)=>{
      const {candy} = action.payload;
      state.candy.quantity = candy.quantity
    },
    upVip: (state,action)=>{
      const {vip} = action.payload;
      state.vip = vip
    },
    resetAuth: (state) => {
      state.name = "";
      state.email = "";
      state.access_token = "";
      state.id = "";
      state.avatar = "";
      state.sex = "";
      state.displayName = "";
      state.isAdmin = false;
      state.storyWritten = [];
      state.seenStory=[],
      state.status = true;
      state.birthyear = "";
      state.role = 0;
    },
    updateTheme: (state,action) => {
      state.theme = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAuth, resetAuth ,payment,upVip,updateTheme} = authSlice.actions;

export default authSlice.reducer;
