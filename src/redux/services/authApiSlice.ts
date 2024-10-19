import { apiSlice } from './apiSlice';
import { signOut, User } from 'firebase/auth';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { auth, signInWithGooglePopup } from '../../firebase/firebase.utils';
import { clearUser, setUser } from './authSlice';
import { AppDispatch } from '../configure-store';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signInWithGoogle: builder.mutation<User, void>({
      queryFn: async (_, { dispatch }: { dispatch: AppDispatch }) => {
        try {
          const userCredential = await signInWithGooglePopup();
          dispatch(setUser(userCredential.user));
          return { data: userCredential.user };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              data: error,
            } as FetchBaseQueryError
          };
        }
      },
    }),
    signOut: builder.mutation<void, void>({
      queryFn: async (_, { dispatch }: { dispatch: AppDispatch }) => {
        try {
          await signOut(auth);
          dispatch(clearUser());
          return { data: undefined };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              data: error,
            } as FetchBaseQueryError,
          };
        }
      },
    }),
  }),
});

export const { useSignInWithGoogleMutation, useSignOutMutation } = authApiSlice;
