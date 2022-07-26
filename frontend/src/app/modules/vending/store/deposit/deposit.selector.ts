import { EntitySelectorsFactory } from "@ngrx/data";
import { VendingMeta } from '../../../../interfaces/vending/metadata.interface';
import { EntityMap } from '../../../../store/entity/entity-metadata';

export const depositSelectors = new EntitySelectorsFactory().create<VendingMeta['allowedAmounts']>(EntityMap.Deposit);
