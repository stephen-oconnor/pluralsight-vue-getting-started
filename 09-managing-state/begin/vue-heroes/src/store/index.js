import Vue from 'vue';
import Vuex from 'vuex';
import { dataService } from '../shared';
import {
  GET_HEROES,
  ADD_HERO,
  DELETE_HERO,
  UPDATE_HERO,
} from './mutation-types';

Vue.use(Vuex);

// Initial state.
const state = {
  heroes: [],
};

// Commit the actions/data. Same as reducers in React. We seem to be mutating state, not creating a copy.
const mutations = {
  [GET_HEROES](state, heroes) {
    state.heroes = heroes;
  },
  [ADD_HERO](state, hero) {
    state.heroes.push(hero);
  },
  [DELETE_HERO](state, hero) {
    state.heroes = [...state.heroes.filter(_hero => _hero.id !== hero.id)];
  },
  [UPDATE_HERO](state, hero) {
    const index = state.heroes.findIndex(_hero => _hero.id === hero.id);
    state.heroes.splice(index, 1, hero);
  },
};

// Go get the data. Same as actions in React.
// Gives you access to { state, getters, commit, dispatch }.
const actions = {
  async getHeroesAction({ commit }) {
    const heroes = await dataService.getHeroes();
    // Call mutation.
    commit(GET_HEROES, heroes);
  },
  async addHeroAction(context, hero) {
    const addedHero = await dataService.addHero(hero);
    // Call mutation.
    context.commit(ADD_HERO, addedHero);
  },
  async deleteHeroAction({ commit }, hero) {
    const deletedHeroId = await dataService.deleteHero(hero);
    // Call mutation.
    commit(DELETE_HERO, deletedHeroId);
  },
  async updateHeroAction({ commit }, hero) {
    const updatedHero = await dataService.updateHero(hero);
    // Call mutation.
    commit(UPDATE_HERO, updatedHero);
  },
};

// Get a specific part of state. Always takes state in as an argument.
const getters = {
  getHeroById: state => id => state.heroes.find(hero => hero.id === id),
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'production',
  state,
  mutations,
  actions,
  getters,
});
