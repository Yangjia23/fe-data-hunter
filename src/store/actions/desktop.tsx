import * as TYPES from "../action-types";
import { getProducts } from "@/api/desktop";
import menus from '@/constants/menus';

export default {
  getProducts () {
    return { type: TYPES.GET_PRODUCTS, payload: getProducts()}
  },
  getMenus () {
    return { type: TYPES.GET_MENUS, payload: [...menus] }
  },
};