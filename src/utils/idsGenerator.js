const idsGenerator = () => {
  return Math.random()
    .toString(26)
    .substr(2, 10);
};

export default idsGenerator;
