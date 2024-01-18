// store.js
import { configureStore } from '@reduxjs/toolkit';
import danhMucReducer from './slice/DanhMucSlice';
import loaiSanPhamReducer from './slice/LoaiSanPhamSlice';
import SanPhamReducer from './slice/SanPhamSlice';
const store = configureStore({
  reducer: {
    danhMuc: danhMucReducer,
    loaiSanPham: loaiSanPhamReducer,
    sanPham: SanPhamReducer,
  },
});

export default store;
