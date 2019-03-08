export const state = () => ({
  drawAmount: 1,
  playerScore: 0,
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
    state.cardPack = value;
  },
  drawCard(state, value) {
    state.playerCards.push({image: value.image, value: value.value});
  },
  updateCardRemaining(state, value) {
    state.cardPack.remaining = value;
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
      context.commit('updateCardRemaining', response.data.remaining);
      context.commit('drawCard', response.data['cards'][0]);
    })
  }
};
