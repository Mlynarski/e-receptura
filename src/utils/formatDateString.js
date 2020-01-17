const formatDateString = date => {
  return date
    .split('/')
    .reverse()
    .join('-');
};

export default formatDateString;
