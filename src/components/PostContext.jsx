import { createContext, useContext, useReducer } from "react";

const PostContext = createContext();
const initialState = { postedData: [] };

// Reducer Function
const postReducer = (state, action) => {
  switch (action.type) {
    case "ADD_POST":
      // 새로운 포스트를 추가하여 새로운 상태를 반환
      return {
        ...state,
        postedData: [...state.postedData, action.payload],
      };
    default:
      return state;
  }
};

// PostProveider Component
const PostProvider = ({ children }) => {
  // useReducer를 통해 상태와 디스패치 함수 가져오기
  const [state, dispatch] = useReducer(postReducer, initialState);

  // 포스트 추가
  const addPost = (post) => {
    dispatch({ type: "ADD_POST", payload: post });
  };

  return (
    <PostContext.Provider value={{ state, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

// Context를 사용하는 훅
const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};

export { PostProvider, usePostContext };
