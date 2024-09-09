import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import { AppThunk } from "../types/utils";
import { authService } from "../services/authService";
import { IFormLogin, IUserState } from "../types/User";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "default_key";

const encryptData = (data: string) => {
  const encryptedData = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  return encryptedData;
};

const decryptData = (ciphertext: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  } catch (e) {
    console.error("Error decrypting data:", e);
    return "";
  }
};

const initialState: IUserState = {
  password: "",
  isAuthenticated: false,
  username: "",
  accessToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.isAuthenticated = false;
      state.password = encryptData("");
      state.username = encryptData("Guest");
      state.accessToken = "";
    },
    editUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.username = encryptData(action.payload.name);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.username = action.payload.username || "Default Name";
      state.isAuthenticated = true;
      state.accessToken = encryptData(action.payload.accessToken);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload as string;
    });
  },
});

export const { signOut, editUser } = userSlice.actions;
export default userSlice.reducer;

export const login = createAsyncThunk("user/login", async (credentials: IFormLogin, { rejectWithValue }) => {
  try {
    const response: any = await authService({ ...credentials });
    if (response.id) {
      return {
        username: response.username || "Default Name",
        isAuthenticated: true,
        accessToken: response.accessToken,
      };
    } else {
      return rejectWithValue("Error in authentication");
    }
  } catch (error) {
    return rejectWithValue("An error occurred during authentication");
  }
});

export const logout = (): AppThunk => async (dispatch) => {
  try {
    dispatch(signOut());
  } catch (error) {
    dispatch({
      type: "user/authFailure",
      payload: "An error occurred during sign out",
    });
  }
};
