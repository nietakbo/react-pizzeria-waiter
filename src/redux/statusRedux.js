import { createSelector } from '@reduxjs/toolkit';
import { API_URL } from '../settings';

const selectStatus = state => state.status;

export const getStatus = createSelector([selectStatus], statuses => statuses);

const createActionName = name => `api/tables/${name}`;
const UPDATE_STATUSES = createActionName('UPDATE_STATUS');
export const updateStatuses = payload => ({ type: UPDATE_STATUSES, payload });

export const fetchStatuses = () => {
  return dispatch => {
    fetch(`${API_URL}/statuses`)
      .then(res => res.json())
      .then(statuses => dispatch(updateStatuses(statuses)));
  };
};

const reducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_STATUSES:
      return [...action.payload];
    default:
      return statePart;
  }
};
export default reducer;