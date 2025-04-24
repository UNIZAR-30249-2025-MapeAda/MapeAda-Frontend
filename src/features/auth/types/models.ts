import { Role } from "../../../config/constants";

export type User = {
  nip: string;
  username: string;
  email: string;
  role: Role;
  token: string;
};
