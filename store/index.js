export const state = () => ({
  drawAmount: 1,
  playerScore: 0,
  cardTypes: {'KING': 10, 'QUEEN': 10, 'JACK': 10, 'ACE': 11},
  dealerScore: 0,
  dealerCards: [{
    image: '',
    value: '',
  }],
  playerCards: [],
  cardPack: {
    deck_id: '',
    remaining: null,
    shuffled: null,
    success: null,
  }
});

export const mutations = {

  setCardPack(state, value) {
    state.playerCards = [];
    state.playerScore = 0;
    state.cardPack = value;
  },
  drawCard(state, value) {
    state.playerCards.push({image: value.image, value: value.value});
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
      context.commit('setCardPack', response.data);

    });
  },
  drawCard(context) {
    this.app.$api.get(this.state.cardPack.deck_id +
      '/draw/?count=' + this.state.drawAmount).then(response => {
      let currentCard = response.data['cards'][0];
      context.commit('updateCardRemaining', response.data.remaining);
      context.commit('drawCard', currentCard);
      context.commit('calculatedCurrentPlayerScore', currentCard)
    })
  }
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
