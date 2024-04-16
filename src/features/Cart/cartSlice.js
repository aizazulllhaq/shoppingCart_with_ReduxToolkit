import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem
} from "./cartAPI"

const initialState = {
  items: [],
  status: 'idle',
};

export const fetchAsync = createAsyncThunk(
  'cart/fetchItems',
  async () => {
    const { data } = await fetchItems();
    return data;
  }
);

export const addAsync = createAsyncThunk(
  'cart/addItem',
  async (item) => {
    const { id, title, brand, price, stock, images } = item;
    const { data } = await addItem({ id, title, brand, price, stock, images, quantity: 1 });
    return data;
  }
);

export const deleteAsync = createAsyncThunk(
  'cart/deleteItem',
  async (id) => {
    await deleteItem(id);
    return id;
  }
);

export const updateAsync = createAsyncThunk(
  'cart/updateItem',
  async ({ id, change }) => {
    const { data } = await updateItem(id, change); // quantity-value , id

    return data;
  }
)


export const cartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Empty Reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const itemIndex = state.items.findIndex(item => item.id === action.payload);
        state.items.splice(itemIndex, 1)
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        console.log(index, action.payload)
        state.items.splice(index, 1, action.payload);
      });
  },
});

// export const {  } = productsSlice.actions;

export default cartSlice.reducer;
