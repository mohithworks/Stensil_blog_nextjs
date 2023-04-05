import { createContext, useContext } from "react";

export type GlobalContent = {
  author: any
  post: any
  currentPost?: any
  navigation?: any
  initpostRange?: any
  finpostRange?: any
}

export const MyGlobalContext = createContext<GlobalContent>({
  author: 'Hello World', // set a default value
  post: 'Hello World', // set a default value
  currentPost: 'Hello World', // set a default value
  navigation: 'Hello World', // set a default value
  initpostRange: 0,
  finpostRange: 0
});

export const useGlobalContext = () => useContext(MyGlobalContext);