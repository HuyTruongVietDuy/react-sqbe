// sanPhamSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sanPhamSlice = createSlice({
  name: 'sanPham',
  initialState: {
    sanPhamList: [],
  },
  reducers: {
    setSanPhamList: (state, action) => {
      state.sanPhamList = action.payload;
    },
  },
});

export const { setSanPhamList } = sanPhamSlice.actions;
export default sanPhamSlice.reducer;
