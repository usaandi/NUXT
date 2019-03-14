export const state = () => ({
  drawAmount: 1,
  playerScore: 0,
  gameState: false,
  cardTypes: {'KING': 10, 'QUEEN': 10, 'JACK': 10, 'ACE': 11},
  dealerScore: 0,
  dealerDeck: [{
    image: '',
    value: '',
  }],
  playerDeck: [],
  cardPack: {
    deck_id: '',
    remaining: null,
    shuffled: null,
    success: null,
  }
});

export const mutations = {

  SET_CARD_PACK(state, value) {
    state.playerDeck = [];
    state.dealerDeck = [];
    state.playerScore = 0;
    state.dealerScore = 0;
    state.cardPack = value;
  },
  setNewGame(state, value) {
    state.playerDeck = [];
    state.dealerDeck = [];
    state.playerScore = 0;
    state.dealerScore = 0;
    state.cardPack.remaining = value.remaining
  },
  drawCard(state, value) {
    state.playerDeck.push({image: value.image, value: value.value});
  },
  updateCardRemaining(state, value) {
    state.cardPack.remaining = value;
  },
  calculatedCurrentPlayerScore(state, value) {
    state.playerScore += calculateValue(state, value.value);
  }

};

export const actions = {
  generateDeck(context) {
    this.app.$api.get('new/shuffle/?deck_count=1').then(response => {
      context.commit('SET_CARD_PACK', response.data);
      context.dispatch('drawPlayerCards2');
      context.dispatch('drawDealerCards2');
    });
  },
  startGameAgain(context) {
    this.app.$api.get(this.state.cardPack.deck_id + '/shuffle/').then(response => {
      if (this.state.cardPack.deck_id === response.data.deck_id) {
        context.commit('setNewGame', response.data)
      }
    })
  },
  drawPlayerCards2(context) {

  },
  drawDealerCards2(context) {

  },
  drawCard(context) {
    this.app.$api.get(this.state.cardPack.deck_id +
      '/draw/?count=' + this.state.drawAmount).then(response => {
      let currentCard = response.data['cards'][0];
      context.commit('updateCardRemaining', response.data.remaining);
      context.commit('drawCard', currentCard);
      context.commit('calculatedCurrentPlayerScore', currentCard)
    })
  },

};

export const getters = {
  currentPlayerScore: state => {
    return state.playerScore;
  },


};

function calculateValue(state, cardValue) {
  if (state.cardTypes.hasOwnProperty(cardValue)) {
    if (cardValue === 'ACE' && state.playerScore > 11) {
      return 1;
    }
    return parseInt(state.cardTypes[cardValue]);
  } else {
    return parseInt(cardValue);
  }
}
