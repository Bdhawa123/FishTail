import { createSlice } from '@reduxjs/toolkit';

export const styleReducer = createSlice({
  name: 'Style',
  initialState: {
    blur: {
      blurState: false,
      blurEffect: { filter: 'blur(0px)' }
    }
  },
  reducers: {
    toggleBlur: (state) => {
      if (state.blur.blurState) {
        state.blur = { blurState: false, blurEffect: { filter: 'blur(0px)' } };
      } else {
        state.blur = { blurState: true, blurEffect: { filter: 'blur(8px)' } };
      }
    }
  }
});

export const { toggleBlur } = styleReducer.actions;

export default styleReducer.reducer;
