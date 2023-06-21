"use client"

import { FC } from "react";
import { createContext, useContext } from "react";

export type GlobalContent = {
  errors: any
  post: any
  author: any
  nav?: any
  currentPost?: any
  domain1: string
  domain2: string
  initpostRange?: any
  finpostRange?: any
}

export type GlobalContextProvider = {
  children: React.ReactNode,
  data: GlobalContent
}

export const MyGlobalContext = createContext<GlobalContent>({
  errors: false,
  post: 'Hello World', 
  author: 'Hello World',
  nav: 'Hello World',
  currentPost: 'Hello World',
  domain1: 'Hello World',
  domain2: 'Hello World',
  initpostRange: 0,
  finpostRange: 0
});

export const useGlobalContext = () => useContext(MyGlobalContext);

export const GlobalContextProvider:FC<GlobalContextProvider> = ({ children, data }) => { 
    return (
        <MyGlobalContext.Provider value={data}>
        {children}
        </MyGlobalContext.Provider>
    );
}

export default GlobalContextProvider;