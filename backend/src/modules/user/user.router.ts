import { CrudRoute } from './../../common/classes/crud-route';
import controller from './user.controller';
import { Router } from 'express';
import { userValidations } from '../../common/utils/validations';
import validator from '../../middlewares/validator';

export class UserRoute extends CrudRoute {
  public router: Router = Router();
  public controller = controller;

  public constructor() {
    super();
    this.init();
  }

  public init(): void {
    /**
     * This function comment is parsed by doctrine
     * @route Get /users/
     * @group Users
     * @produces application/json
     * @param {string} search.query - filter by username
     * @param {string} page.query - set page
     * @param {string} sort.query - set sort
     * @param {string} limit.query - set limit
     * @param {string} order.query - set order
     * @returns {object} 200 - Users
     * @returns {Error}  default - Unexpected error
     * @security JWT
    */
    this.router.get('/', controller.index);

    /**
     * This function comment is parsed by doctrine
     * @route Get /users/{id}
     * @group Users
     * @produces application/json
     * @param {string} id.path - user ID
     * @returns {object} 200 - Users
     * @returns {Error}  default - Unexpected error
     * @security JWT
    */
     this.router.get('/:id', controller.get);

     /**
     * @typedef User
     * @property {string} name - User's name
     * @property {string} password - Set new password
     * @property {string} confirmPassword - Confirm new password
     */

    /**
     * This function comment is parsed by doctrine
     * @route PUT /users/{id}
     * @group Users
     * @produces application/json
     * @param {string} id.path - user ID
     * @param {User.model} point.body.required - new user details
     * @returns {object} 200 - Users
     * @returns {Error}  default - Unexpected error
     * @security JWT
    */
     this.router.put('/:id', userValidations.userUpdate, validator.validate, controller.updateUser);

     /**
     * This function comment is parsed by doctrine
     * @route DELETE /users/{id}
     * @group Users
     * @produces application/json
     * @param {string} id.path - user ID
     * @returns {object} 200 - Users
     * @returns {Error}  default - Unexpected error
     * @security JWT
    */
      this.router.delete('/:id', controller.delete);
  }
}

export default new UserRoute().router;
