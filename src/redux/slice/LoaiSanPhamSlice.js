// loaiSanPhamSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loaiSanPhamSlice = createSlice({
  name: 'loaiSanPham',
  initialState: { loaiSanPhamList: [] },
  reducers: {
    setLoaiSanPhamList: (state, action) => {
      state.loaiSanPhamList = action.payload;
    },
  },
});

export const { setLoaiSanPhamList } = loaiSanPhamSlice.actions;
export default loaiSanPhamSlice.reducer;
