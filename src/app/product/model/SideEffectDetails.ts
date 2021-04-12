import { PageResponse } from '../../core/model/PageResponse';
import { Product } from './Product';

export interface SideEffectDetails {
    id: number;
    name: string;
    products: PageResponse<Product>;
}
