const SET_TEAM = 'team/ADD_TEAM';
const RESET_TEAM = 'team/RESET_TEAM';

const initialState = {
  team: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAM:
      return { ...state, team: action.payload };
    case RESET_TEAM:
      return initialState;
    default:
      return state;
  }
};

// To set team
const setTeam = team => {
  return {
    type: SET_TEAM,
    payload: team
  };
};

// To reset team
const resetTeam = () => {
  return {
    type: RESET_TEAM
  };
};

const selectTeam = state => state.teamState.team;

const actionTypes = {
  SET_TEAM,
  RESET_TEAM
};

const actions = {
  setTeam,
  resetTeam
};

const selectors = {
  selectTeam
};

export { actionTypes, actions, selectors };