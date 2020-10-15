import {AnyAction} from 'redux'
import * as TYPES from '../action-types'
import Product from "@/typings/product";
import Menu from "@/typings/menu"

export interface DesktopState {
  products: Product[],
  menus: Menu[],
}

let initialState: DesktopState = {
  products: [{name: 'sb', id: '1' }],
  menus: [],
}

export default function(state: DesktopState = initialState, action: AnyAction): DesktopState {
  switch (action.type) {
    case TYPES.GET_PRODUCTS:
      return {...state, products: action.payload.data }
    case TYPES.GET_MENUS:
      return {...state, menus: action.payload }
    default:
      return state
  }
}