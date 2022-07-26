import ProductService from './product.service';
import CrudController from '../../common/controllers/crud';


export class ProductController extends CrudController {
  public service = ProductService;
}

export default new ProductController();
