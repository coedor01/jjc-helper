export interface UserUpdate {
  name: string,
  qq: string | null,
  email: string | null,
  phone: string | null,
}

export interface UserCreate extends UserUpdate {
  username: string,
  password: string,
}


export interface UserOut extends UserUpdate {
  id: number,
  username: string,
}

export interface GuestCreate {
  signature: string
}

export interface GuestOut extends GuestCreate {
  id: number,
}
