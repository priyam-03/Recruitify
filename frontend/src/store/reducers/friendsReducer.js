import { friendsActions } from "../actions/friendsActions";

const initState = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
  group: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case friendsActions.SET_PENDING_FRIENDS_INVITATIONS:
      return {
        ...state,
        pendingFriendsInvitations: action.pendingFriendsInvitations,
      };
    case friendsActions.SET_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    case friendsActions.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
    case friendsActions.SET_GROUP:
      return {
        ...state,
        group: action.group,
      };
    default:
      return state;
  }
};

export default reducer;
