import { VendingState } from '../../interfaces/vending/vending.state.interface';

const initialVendingState: VendingState = {
  buy: {},
  deposit: {}
}
export const vendingFeatureKey = 'vending';
export default initialVendingState
