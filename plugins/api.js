import Axios from 'axios'

export default ({ app }, inject) => {

  // Set the function directly on the context.app object

  app.$api = Axios.create({

    baseURL: 'https://deckofcardsapi.com/api/deck/',

  });

}
