import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3001/products";
// Hàm fetchApi để gọi API
const fetchApi = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Lỗi khi fetch dữ liệu");
  return res.json();
};
// Đọc dữ liệu từ API
export const fetchP = createAsyncThunk(
  "product/fetchP",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchApi(API_URL);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// Thêm sản phẩm mới vào API
export const addP = createAsyncThunk(
  "productL/addP",
  async (proData, { rejectWithValue }) => {
    try {
      return await fetchApi(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proData),
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// Đọc dữ liệu chi tiết sản phẩm từ API
export const fetchID = createAsyncThunk(
  "productL/fetchID",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchApi(`${API_URL}/${id}`);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// Cập nhật sản phẩm trong API
export const updateP = createAsyncThunk(
  "productL/updateP",
  async (proData, { rejectWithValue }) => {
    try {
      return await fetchApi(`${API_URL}/${proData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proData),
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// Xóa sản phẩm trong API
export const deleteP = createAsyncThunk(
  "productL/deleteP",
  async (id, { rejectWithValue }) => {
    try {
      await fetchApi(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      return id; // Trả về ID để xóa sản phẩm khỏi state
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const initialState = {
  productL: [],
  selectedP: null, // Sản phẩm đang xem chi tiết
  loading: false,
  error: null,
};
const sliceProduct = createSlice({
  name: "productL",
  initialState,
  reducers: {},
  extraReducers: (bd) => {
    // setLoading và setError là các hàm để cập nhật trạng thái loading và error
    const setLoading = (state) => {
      state.loading = true;
      state.error = null;
    };

    const setError = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };
    // Danh sách sản phẩm
    bd.addCase(fetchP.pending, setLoading);
    bd.addCase(fetchP.fulfilled, (state, action) => {
      state.loading = false;
      state.productL = action.payload;
    });
    bd.addCase(fetchP.rejected, setError);
    // Chi tiết sản phẩm
    bd.addCase(fetchID.pending, setLoading);
    bd.addCase(fetchID.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedP = action.payload;
    });
    bd.addCase(fetchID.rejected, setError);
    // Thêm sản phẩm mới
    bd.addCase(addP.pending, setLoading);
    bd.addCase(addP.fulfilled, (state, action) => {
      state.loading = false;
      state.productL.push(action.payload); // Thêm sản phẩm mới vào danh sách
    });
    bd.addCase(addP.rejected, setError);
    // Cập nhật sản phẩm
    bd.addCase(updateP.pending, setLoading);
    bd.addCase(updateP.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.productL.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.productL[index] = action.payload; // Cập nhật sản phẩm trong danh sách
      }
    });
    bd.addCase(updateP.rejected, setError);
    // Xóa sản phẩm
    bd.addCase(deleteP.pending, setLoading);
    bd.addCase(deleteP.fulfilled, (state, action) => {
      state.loading = false;
      state.productL = state.productL.filter(
        (product) => product.id !== action.payload // Lọc bỏ sản phẩm đã xóa
      );
    });
    bd.addCase(deleteP.rejected, setError);
  },
});

export default sliceProduct.reducer;
