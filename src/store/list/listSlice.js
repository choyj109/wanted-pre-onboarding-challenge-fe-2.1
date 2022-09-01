import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getList = createAsyncThunk("GET_LIST", async () => {
  try {
    const res = await axios.get(
      "https://my-json-server.typicode.com/choyj109/wanted-pre-onboarding-challenge-fe-2/list"
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const addList = createAsyncThunk("ADD_LIST", async (newList) => {
  try {
    const res = await axios.post(
      `https://my-json-server.typicode.com/choyj109/wanted-pre-onboarding-challenge-fe-2/list`,
      newList
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const deleteList = createAsyncThunk("DELETE_LIST", async (id) => {
  try {
    const res = await axios.delete(
      `https://my-json-server.typicode.com/choyj109/wanted-pre-onboarding-challenge-fe-2/list/${id}`
    );
    return id;
  } catch (err) {
    console.log(err);
  }
});

export const updateList = createAsyncThunk(
  "UPDATE_LIST",
  async ({ id, content, category, hashtags }) => {
    try {
      const res = await axios.put(
        `https://my-json-server.typicode.com/choyj109/wanted-pre-onboarding-challenge-fe-2/list/${id}`,
        {
          content: content,
          category: category,
          hashtags: hashtags,
        }
      );
      return { id, content, category, hashtags };
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteAllList = createAsyncThunk("DELETEALL_LIST", async () => {
  try {
    const res = await axios.get(
      `https://my-json-server.typicode.com/choyj109/wanted-pre-onboarding-challenge-fe-2/list`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

const listSlice = createSlice({
  name: "list",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(addList.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(deleteList.fulfilled, (state, action) => {
      state.data = state.data.filter((ele) => ele.id !== action.payload);
    });
    builder.addCase(updateList.fulfilled, (state, action) => {
      const idx = state.data.findIndex((ele) => ele.id === action.payload.id);
      state.data.splice(idx, 1, action.payload);
    });
    builder.addCase(deleteAllList.fulfilled, (state) => {
      state.data = [];
    });
  },
});

export default listSlice.reducer;
