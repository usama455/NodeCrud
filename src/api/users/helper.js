import bcrypt from 'bcrypt';
import queries from "./queries";
import { resStatuses } from '../../constants/response';


const checkUserExists = async ({ body }, res, next) => {
    const { email } = body;
    const user = await queries.findOne(email);
    if (user) {
      return res
        .status(resStatuses.badRequest)
        .json({ success: false, message: 'User already exists' });
    }
    return next();
  };

const encryptPassword = async ({body} , res , next) => {

    const {password } = body
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(password, salt);
    return next();
}

export {encryptPassword, checkUserExists}