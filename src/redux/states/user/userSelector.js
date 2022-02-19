const getUserToken = (state) =>  state?.user?.userState?.token;
const getUserRole = (state) => state?.user?.userState?.superadmin;
const getLoadingError = (state) => state?.user?.userState?.loadingError;
const getLoginError = (state) => state.user.error;

export default {
    getUserToken, getUserRole, getLoadingError, getLoginError,
};
