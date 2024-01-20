export const success = (data: unknown) => {
  return {
    data
  };
};

export const error = (msg: string) => {
  return {
    error: msg
  };
};
