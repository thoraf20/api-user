import * as typeorm from "typeorm";
import UserWithThatEmailAlreadyExistsException from "../../exceptions/UserWithEmailExist";
import {CreateUserDto} from "../user.dto";
import UserService from "../user.service";

(typeorm as any).getRepository = jest.fn();

describe("The UserService", () => {
  describe("when registering a user", () => {
    describe("if the email is already taken", () => {
      it("should throw an error", async () => {
        const userData: CreateUserDto = {
          fullName: "John Smith",
          email: "john@smith.com",
        };
        (typeorm as any).getRepository.mockReturnValue({
          findOne: () => Promise.resolve(userData),
        });
        const userService = new UserService();
        await expect(userService.register(userData)).rejects.toMatchObject(
          new UserWithThatEmailAlreadyExistsException(userData.email)
        );
      });
    });
    describe("if the email is not taken", () => {
      it("should not throw an error", async () => {
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
        const authenticationService = new UserService();
        await expect(
          authenticationService.register(userData)
        ).resolves.toBeDefined();
      });
    });
  });
});
