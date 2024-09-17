import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setFilter } from '../../features/usersSlice';
import ToggleButton from '../ToggleButton/ToggleButton';
import styles from './UsersList.module.css';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

type Filters = {
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.list as User[]);
  const filters = useSelector((state: RootState) => state.users.filters as Filters);
  const [showFilters, setShowFilters] = useState(false);

  const filteredUsers = users.filter(user =>
    Object.keys(filters).every(key => {
      const filterValue = filters[key as keyof Filters].toLowerCase();
      const userValue = String(user[key as keyof User]).toLowerCase();
      return userValue.startsWith(filterValue);
    })
  );

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    dispatch(setFilter({ filter: name as keyof Filters, value }));
  }

  return <>
    <table className={styles.table}>
      <thead>
      <tr className={styles.tr}>
        <th className={styles.th}>
          Name
          {showFilters && (
            <input
              type="text"
              name="name"
              placeholder="Search name"
              value={filters.name}
              onChange={handleFilterChange}
              className={styles.input}
            />
          )}
        </th>
        <th className={styles.th}>
          Username
          {showFilters && (
            <input
              type="text"
              name="username"
              placeholder="Search username"
              value={filters.username}
              onChange={handleFilterChange}
              className={styles.input}
            />
          )}
        </th>
        <th className={styles.th}>
          Email
          {showFilters && (
            <input
              type="text"
              name="email"
              placeholder="Search e-mail"
              value={filters.email}
              onChange={handleFilterChange}
              className={styles.input}
            />
          )}
        </th>
        <th className={styles.th}>
          Phone
          {showFilters && (
            <input
              type="text"
              name="phone"
              placeholder="Search phone"
              value={filters.phone}
              onChange={handleFilterChange}
              className={styles.input}
            />
          )}
        </th>
      </tr>
      </thead>
      <tbody>
      {filteredUsers.map(user => (
        <tr key={user.id} className={styles.tr}>
          <td className={styles.td}>{user.name}</td>
          <td className={styles.td}>{user.username}</td>
          <td className={styles.td}>{user.email}</td>
          <td className={styles.td}>{user.phone}</td>
        </tr>
      ))}
      </tbody>
    </table>

    <div style={{ margin: '15px 10px' }}>
      <ToggleButton onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </ToggleButton>
    </div>
  </>
}
