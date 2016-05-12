import reduxApi from "redux-api";
import * as CONFIG from '../constants/config'

const headers = {
  //"User-Agent": "redux-api"
};
const URL = CONFIG.API_URL;

export default reduxApi({
  allQuiz: {
    url: `${URL}/quiz`,
    options: { headers }
  }
});
