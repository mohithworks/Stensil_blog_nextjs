import { createContext, useContext } from "react";

export type GlobalContent = {
  author: any
  post: any
  currentPost?: any
  navigation?: any
  domain1: string
  domain2: string
}

export const MyGlobalContext = createContext<GlobalContent>({
  author: 'Hello World', // set a default value
  post: 'Hello World', // set a default value
  currentPost: 'Hello World', // set a default value
  navigation: 'Hello World', // set a default value
  domain1: '',
  domain2: ''
});

export const useGlobalContext = () => useContext(MyGlobalContext);