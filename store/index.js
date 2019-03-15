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
  SET_NEW_GAME(state, value) {
    state.playerDeck = [];
    state.dealerDeck = [];
    state.playerScore = 0;
    state.dealerScore = 0;
    state.cardPack.remaining = value.remaining
  },
  DRAW_CARD(state, value) {
    state.playerDeck.push({image: value.image, value: value.value});
  },
  UPDATE_CARD_REMAINING(state, value) {
    state.cardPack.remaining = value;
  },
  CALCULATED_CURRENT_PLAYER_SCORE(state, value) {
    state.playerScore += calculateValue(state, value.value);
  },
  DRAW_DEALER_2_CARDS(state, value) {
    value.map(v => {
      state.dealerDeck.push({image: v.image, value: v.value});
      state.dealerScore += calculateValue(state, v.value);
    });

  },
  DRAW_PLAYER_2_CARDS(state, value) {
    value.map(v => {
      state.playerDeck.push({image: v.image, value: v.value});
      state.playerScore += calculateValue(state, v.value);
    });
  },

};

export const actions = {

  checkWinCondition(context) {

  },


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
        context.commit('SET_NEW_GAME', response.data);
        context.dispatch('drawPlayerCards2');
        context.dispatch('drawDealerCards2');
      }
    })
  },
  drawPlayerCards2(context) {
    this.app.$api.get(this.state.cardPack.deck_id +
      '/draw/?count=' + 2).then(response => {
      let currentCards = response.data['cards'];
      context.commit('UPDATE_CARD_REMAINING', response.data.remaining);
      context.commit('DRAW_PLAYER_2_CARDS', currentCards);

    })

  },
  drawDealerCards2(context) {
    this.app.$api.get(this.state.cardPack.deck_id +
      '/draw/?count=' + 2).then(response => {
      let currentCards = response.data['cards'];
      context.commit('UPDATE_CARD_REMAINING', response.data.remaining);
      context.commit('DRAW_DEALER_2_CARDS', currentCards);

    })
  },

  drawCard(context) {
    this.app.$api.get(this.state.cardPack.deck_id +
      '/draw/?count=' + this.state.drawAmount).then(response => {
      let currentCard = response.data['cards'][0];
      context.commit('UPDATE_CARD_REMAINING', response.data.remaining);
      context.commit('DRAW_CARD', currentCard);
      context.commit('CALCULATED_CURRENT_PLAYER_SCORE', currentCard)
    })
  },

};

export const getters = {
  currentPlayerScore: state => {
    return state.playerScore;
  },
  currentDealerScore: state => {
    return state.dealerScore;
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
