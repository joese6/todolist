export const validateRequired = (req, fieldName) => {
  if (!req.body[fieldName]) {
    return fieldName;
  } else {
    return false;
  }
};
