import React from 'react';

export type Action = {
  type: 'SET_CATEGORY';
  payload: string;
};
export interface State {
  categoryId: string;
}
export interface Dispatch {
  (action: Action): void;
}
export interface ContentProviderProps {
  children: React.ReactNode;
}

const ContentStateContext = React.createContext<State | undefined>(undefined);
const ContentDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

const initialState = { categoryId: '' };

function contentReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        categoryId: action.payload,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ContentProvider({ children }: ContentProviderProps) {
  var [state, dispatch] = React.useReducer(contentReducer, initialState);

  return (
    <ContentStateContext.Provider value={state}>
      <ContentDispatchContext.Provider value={dispatch}>
        {children}
      </ContentDispatchContext.Provider>
    </ContentStateContext.Provider>
  );
}

function useContentState() {
  var context = React.useContext(ContentStateContext);
  if (context === undefined) {
    throw new Error('Content State must be used within a Content Provider');
  }
  return context;
}

function useContentDispatch() {
  var context = React.useContext(ContentDispatchContext);
  if (context === undefined) {
    throw new Error('useContentDispatch must be used within a ProjectProvider');
  }
  return context;
}

export { useContentDispatch, useContentState, ContentProvider, setCategory };

// ###########################################################

/**
 * function to update Metadata
 * @returns void
 */
async function setCategory(dispatch: Dispatch, categoryId: string) {
  dispatch({
    type: 'SET_CATEGORY',
    payload: categoryId,
  });
}
