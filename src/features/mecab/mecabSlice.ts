import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

const mecabApiUrl = process.env.REACT_APP_DEV_MECAB_API_URL;

export const fetchAsyncPostMecab = createAsyncThunk("mecab/post", async (text: string) => {
  const uploadData = { text: text };
  //   console.log(uploadData);
  const res = await axios.post(`${mecabApiUrl}`, uploadData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  // return res.data;
  const data = res.data;
  const exception = [
    "そう",
    "ない",
    "いる",
    "する",
    "まま",
    "よう",
    "てる",
    "なる",
    "こと",
    "もう",
    "いい",
    "ある",
    "ゆく",
    "れる",
    "なっ",
    "ちゃっ",
    "ちょっ",
    "ちょっ",
    "やっ",
    "あっ",
    "ちゃう",
    "その",
    "あの",
    "この",
    "どの",
    "それ",
    "あれ",
    "これ",
    "どれ",
    "ところ",
    "から",
    "なら",
    "だけ",
    "じゃあ",
    "られ",
    "たら",
    "のに",
    "って",
    "られ",
    "ずっ",
    "じゃ",
    "ちゃ",
    "くれ",
    "なんて",
    "だろ",
    "でしょ",
    "せる",
    "なれ",
    "どう",
    "たい",
    "けど",
    "でも",
    "って",
    "まで",
    "なく",
    "もの",
    "ここ",
    "どこ",
    "そこ",
    "さえ",
    "なく",
    "たり",
    "なり",
    "だっ",
    "まで",
    "ため",
    "ながら",
    "より",
    "られる",
    "です",
    "ほか",
    "の",
  ];
  const textList = data.filter((text: any) => exception.includes(text.text) === false);

  return textList;
});

export const mecabSlice = createSlice({
  name: "mecab",
  initialState: {
    text: "",
    isLoadingMecab: false,
    mecabResponse: [],
  },

  reducers: {
    fetchMecabStart(state) {
      state.isLoadingMecab = true;
    },
    fetchMecabEnd(state) {
      state.isLoadingMecab = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAsyncPostMecab.fulfilled, (state, action) => {
      state.mecabResponse = action.payload;
    });
  },
});

export const { fetchMecabStart, fetchMecabEnd } = mecabSlice.actions;

export const selectMecabResponse = (state: RootState) => state.mecab.mecabResponse;

export const selectIsLoadingMecab = (state: RootState) => state.mecab.isLoadingMecab;

export default mecabSlice.reducer;
