import { produce } from 'immer';
import { loginUser, registerUser } from '../services/auth.js';
import { devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { getUserDetails } from '../services/user.js';
import CryptoJS from 'crypto-js';

const k = CryptoJS.SHA256(`auth ${Math.PI.toString(16)}`).toString(CryptoJS.enc.Base64);

const initialState = {
  hashId: null,
  token: null,
  expireToken: null,
  lastname: null,
  firstname: null,
  email: null,
  point: 0,
  role: 0,
  company: {
    hashId: null,
    name: null,
    address: null,
    country: null,
    phone: null,
  },
};

const userStore = (set, get) => ({
  user: {
    ...initialState,
  },

  signUp: (firstname, lastname, email, password) => {
    return registerUser(firstname, lastname, email, password).then((res) => Promise.resolve(res.data));
  },

  signIn: (email, password) => {
    return loginUser(email, password).then((res) => {
      console.log(res);
      console.log(get().user);
      set(
        produce((state) => {
          state.user = {
            ...initialState,
            hashId: res.data.hashId,
            token: res.data.token.access_token,
            expireToken: res.data.token.expire,
          };
        }),
        false,
        'user/signIn',
      );
      return Promise.resolve(res);
    });
  },

  signOut: () => {
    set(
      produce((state) => {
        state.user = { ...initialState };
      }),
      false,
      'user/signOut',
    );
  },

  fetchUser: async () => {
    console.log(get().user);
    return await getUserDetails(get().user.hashId).then((res) => {
      const { company, email, firstname, lastname, point, role } = res.data;
      set(
        produce((state) => {
          state.user = {
            ...get().user,
            lastname: lastname,
            firstname: firstname,
            email: email,
            point: point,
            role: role,
            company: {
              ...company,
            },
          };
        }),
      );
      return Promise.resolve(res.data);
    });
  },
});

const useStore = create(
  devtools(
    persist(userStore, {
      name: 'USER',
      serialize: (state) => CryptoJS.AES.encrypt(JSON.stringify(state), k).toString(),
      deserialize: (str) => JSON.parse(CryptoJS.AES.decrypt(str, k).toString(CryptoJS.enc.Utf8)),
    }),
    { name: 'userStore' },
  ),
);

export const useIsAuth = () => useStore((state) => state?.user?.token !== null);
export default useStore;
