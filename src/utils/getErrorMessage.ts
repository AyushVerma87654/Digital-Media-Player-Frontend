export const getErrorMessage = (error: any): string => {
  return error?.response?.data?.error || error.message || "Unknown error";
};
