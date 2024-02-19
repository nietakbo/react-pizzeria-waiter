import { createSelector } from '@reduxjs/toolkit';
import { API_URL } from '../settings';

const selectTables = state => state.tables;
const selectTableId = (state, id) => id;

export const getTables = createSelector([selectTables], tables => tables);
export const getTableById = createSelector(
  [selectTables, selectTableId],
  (tables, id) => tables.find(table => table.id === id)
);
const createActionName = name => `api/tables/${name}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const removeTable = payload => ({ type: REMOVE_TABLE, payload });
export const addTable = payload => ({ type: ADD_TABLE, payload });

export const fetchTables = () => {
  return dispatch => {
    fetch(`${API_URL}/tables`)
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)));
  };
};

export const updateDataOnServer = (id, updatedData) => {
  return dispatch => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    };

    fetch(`${API_URL}/tables/${id}`, options)
      .then(res => res.json())
      .then(data => dispatch(editTable(data)));
  };
};

export const removeTableFromServer = id => {
  return dispatch => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`${API_URL}/tables/${id}`, options)
      .then(res => res.json())
      .then(dispatch(removeTable(id)));
  };
};

export const addTableToServer = newData => {
  return dispatch => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    };
    fetch(`${API_URL}/tables`, options)
      .then(res => res.json())
      .then(data => {
        dispatch(addTable(data));
      });
  };
};

const reducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case EDIT_TABLE:
      return statePart.map(table =>
        table.id === action.payload.id ? { ...table, ...action.payload } : table
      );
    case REMOVE_TABLE:
      return statePart.filter(table => table.id !== action.payload.id);
    case ADD_TABLE:
      return [...statePart, { ...action.payload }];
    default:
      return statePart;
  }
};
export default reducer;