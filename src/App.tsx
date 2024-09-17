import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { fetchUsers } from './features/usersSlice';
import Background from './components/Background/Background';
import Header from './components/Header/Header';
import UsersList from './components/UsersList/UsersList';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  return <>
    <Background url='/assets/bg.jpg' />
    <Header />
    <UsersList />
  </>
}
