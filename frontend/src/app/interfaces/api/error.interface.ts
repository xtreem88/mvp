export interface ApiError {
  data: {
    errors: {
      location: string,
      msg: string,
      param: string,
      value: string,
    }[]
  };
  error: boolean;
  message: string;
}
