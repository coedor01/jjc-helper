export interface UserUpdate {
  qq: string | null;
  phone: string | null;
}

export interface UserCreate extends UserUpdate {
  email: string;
  hashedPassword: string;
}

export interface UserOut extends UserUpdate {
  email: string;
  id: string;
}
