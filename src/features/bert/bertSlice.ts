import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

const bertApiUrl = process.env.REACT_APP_DEV_BERT_API_URL;

export const fetchAsyncPostBert = createAsyncThunk("bert/post", async (text: string) => {
  const uploadData = { text: text };
  console.log(uploadData);
  const res = await axios.post(`${bertApiUrl}`, uploadData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
});

export const bertSlice = createSlice({
  name: "bert",
  initialState: {
    text: "",
    isLoadingBert: false,
    bertScore: {
      label: [],
      score: [],
    },
  },

  reducers: {
    fetchBertStart(state) {
      state.isLoadingBert = true;
    },
    fetchBertEnd(state) {
      state.isLoadingBert = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAsyncPostBert.fulfilled, (state, action) => {
      state.bertScore = action.payload;
    });
  },
});

export const { fetchBertStart, fetchBertEnd } = bertSlice.actions;

export const selectBertScore = (state: RootState) => state.bert.bertScore;

export const selectIsLoadingBert = (state: RootState) => state.bert.isLoadingBert;

export default bertSlice.reducer;
