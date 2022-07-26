import Product from './product.model';
import { CrudService } from '../../common/services/crud';

class ProductService extends CrudService {
  public model = Product;
  public modelName = 'Product';
  public filters = [];
}

export default new ProductService();
