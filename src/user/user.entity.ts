import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserStatus } from "./user.enum";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public fullName: string;

  @Column()
  public email: string;

  @Column({ nullable: true })
  public role: string;

  @Column()
  public key: string;

  @Column({ nullable: false, default: UserStatus.ACTIVE })
  public status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
