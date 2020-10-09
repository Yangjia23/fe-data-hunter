import * as TYPES from "../action-types";
import { getSliders } from "@/api/home";
export default {
  setCurrentCategory(currentCategory: string) {
    return { type: TYPES.SET_CURRENT_CATEGORY, payload: currentCategory };
  },
  getSliders () {
    return { type: TYPES.GET_SLIDERS, payload: getSliders()}
  }
};