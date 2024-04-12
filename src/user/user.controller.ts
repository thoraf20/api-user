import * as express from "express";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateUserDto, ResetUserKeyDto} from "../user/user.dto";
import UserService from "./user.service";
import { ResponseCode } from "../utils/responseCode";

export class UserController implements Controller {
  public path = "/user";
  public router = express.Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.registration
    );

    this.router.post(
      `${this.path}/key/reset`,
      validationMiddleware(ResetUserKeyDto),
      this.resetKey
    );
  }

  private registration = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const userData: CreateUserDto = request.body;
    try {
      const { user } = await this.userService.register(userData);
      response
        .status(201)
        .json({ success: true, responseCode: ResponseCode.SUCCESS, data: user });
    } catch (error) {
      next(error);
    }
  };

  private resetKey = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const userData: ResetUserKeyDto = request.body;
    try {
      const newAPIKey = await this.userService.resetAPIKey(userData);
      response
        .status(201)
        .json({ success: true, responseCode: ResponseCode.SUCCESS, data: newAPIKey });
    } catch (error) {
      next(error);
    }
  };
}
