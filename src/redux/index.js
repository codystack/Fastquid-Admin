import { configureStore } from "@reduxjs/toolkit";
import loanReducer from "./slices/loans";
import profileReducer from "./slices/profile";
import loadingReducer from "./slices/backdrop";
import transactionReducer from "./slices/transactions";
import supportReducer from "./slices/support";
import userReducer from "./slices/user";
import adminReducer from "./slices/admin";

export default configureStore({
  reducer: {
    loan: loanReducer,
    profile: profileReducer,
    loading: loadingReducer,
    transaction: transactionReducer,
    support: supportReducer,
    user: userReducer,
    admin: adminReducer,
  },
});
