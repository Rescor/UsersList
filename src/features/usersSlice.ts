import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface Filters {
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  list: User[];
  filters: Filters;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  filters: { name: '', username: '', email: '', phone: '' },
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return (await response.json()) as User[];
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<{ filter: keyof Filters; value: string }>) {
      const { filter, value } = action.payload;
      state.filters[filter] = value;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setFilter } = usersSlice.actions;

export default usersSlice.reducer;
