import dbConfig from "../ormconfig";
import User from "./user.entity";
import {CreateUserDto, ResetUserKeyDto} from "./user.dto";
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithEmailExist";
import { generateApiKey } from "../utils/apiKey";
import HttpException from "../exceptions/HttpExceptions";


class UserService {

  private userRepository = dbConfig.getRepository(User);

  public async register(userData: CreateUserDto) {
    if (
      await this.userRepository.findOne({ where: { email: userData.email } })
    ) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }

    const apiKey = generateApiKey(40);

    const user = this.userRepository.create({
      ...userData,
      key: apiKey,
    });

    await this.userRepository.save(user);

    return {
      user,
    };
  }

  public async resetAPIKey(userData: ResetUserKeyDto) {
    const user = await this.userRepository.findOne({ where: { email: userData.email } })
    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    if (user.key !== userData.apiKey) {
      throw new HttpException(400, 'Invalid API Key');
    }

    const apiKey = generateApiKey(40);

    user.key = apiKey

    await this.userRepository.save(user);

    return {
      newAPIKey: apiKey,
    };
  }
}

export default UserService;
