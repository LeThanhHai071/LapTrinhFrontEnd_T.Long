// Ít nhất 8 ký tự, hoa, thường, số, ký tự đặc biệt
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validatePassword = (password) => {
  return PASSWORD_REGEX.test(password);
};
