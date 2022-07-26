export interface SessionState {
  dataSource: string;
}

export const initialState: SessionState = {
  dataSource: 'local'
};

export interface AppDataState {
  session: SessionState;
}
