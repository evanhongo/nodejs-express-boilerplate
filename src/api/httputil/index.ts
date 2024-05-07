export const success = (data: unknown) => {
  return {
    data
  };
};

export const error = (code: number, msg: string) => {
  return {
    code,
    error: msg
  };
};
