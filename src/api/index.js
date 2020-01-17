import axios from 'axios';

const apiHost = `${window.location.protocol}//${window.location.hostname}`;

const getIngredients = (searchItem, setResponse) => {
  if (searchItem.length > 1) {
    axios
      .get(`${apiHost}/api/ingredients/read.php`, {
        params: {
          s: searchItem,
        },
        timeout: 4000,
      })
      .then(response => setResponse(response.data.ingredients))
      .catch(error => {
        if (error) {
          setResponse([]);
        }
      });
  } else {
    setResponse([]);
  }
};

export default getIngredients;
