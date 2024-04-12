import request from "supertest";
import * as typeorm from "typeorm";
import App from "../../app";
import { CreateUserDto } from "../user.dto";
import { UserController } from "../user.controller";

(typeorm as any).getRepository = jest.fn();

describe("The AuthenticationController", () => {
  describe("POST /auth/register", () => {
    describe("if the email is not taken", () => {
      it("response should have the Set-Cookie header with the Authorization token", () => {
        const userData: CreateUserDto = {
          fullName: "John Smith",
          email: "john@smith.com",
        };
        process.env.JWT_SECRET = "jwt_secret";
        (typeorm as any).getRepository.mockReturnValue({
          findOne: () => Promise.resolve(undefined),
          create: () => ({
            ...userData,
            id: 0,
          }),
          save: () => Promise.resolve(),
        });
        const authenticationController = new UserController();
        const app = new App([authenticationController]);
        return request(app.getServer())
          .post(`${authenticationController.path}/register`)
          .send(userData)
          .expect("Set-Cookie", /^Authorization=.+/);
      });
    });
  });
});
