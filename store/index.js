export const state = () => ({
  modal: {
    active: false,
  },
  cardPack: {
    deck_id: '',
  remaining: null,
  shuffled: null,
  success: null,
}
});

export const mutations = {
  setModalActive(state, value) {
    state.modal.active = value;
  },
  setCardPack(state, value) {

  }

};

export const actions = {

  generateDeck(context) {
    context.commit('setCardPack');
    //this.app.$api.get();
  },
  toggleModal(context) {
    context.commit('setModalActive', !context.state.modal.active)
  }
};
