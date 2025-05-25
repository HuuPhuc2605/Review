import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3001/products";

const fetchApi = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Lỗi khi fetch dữ liệu");
  return res.json();
};

// Thunks
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchApi(API_URL);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      return await fetchApi(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (productData, { rejectWithValue }) => {
    try {
      return await fetchApi(`${API_URL}/${productData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await fetchApi(`${API_URL}/${id}`, { method: "DELETE" });
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = { productList: [], isLoading: false, error: null };

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Dùng 1 hàm chung cho pending & rejected
    const setLoading = (state) => {
      state.isLoading = true;
      state.error = null;
    };
    const setError = (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    };

    builder
      // Fetch
      .addCase(fetchProducts.pending, setLoading)
      .addCase(fetchProducts.rejected, setError)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })

      // Add
      .addCase(addProduct.pending, setLoading)
      .addCase(addProduct.rejected, setError)
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList.push(action.payload);
      })

      // Update
      .addCase(updateProduct.pending, setLoading)
      .addCase(updateProduct.rejected, setError)
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.productList.findIndex(
          (p) => p.id === action.payload.id
        );
        if (idx !== -1) state.productList[idx] = action.payload;
      })

      // Delete
      .addCase(deleteProduct.pending, setLoading)
      .addCase(deleteProduct.rejected, setError)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = state.productList.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
