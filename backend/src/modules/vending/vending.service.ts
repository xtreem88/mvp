import { CrudService } from '../../common/services/crud';
import User from '../user/user.model';

class VendingService extends CrudService {
  public model = User;
  public modelName = 'Vending';
  public filters = [];
}

export default new VendingService();
