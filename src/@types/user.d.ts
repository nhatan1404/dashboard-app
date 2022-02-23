enum Role {
  Admin = 'admin',
  Customer = 'customer',
  Employee = 'employee',
}
interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  password?: string;
  avatar: string;
  address?: string;
  email: string;
  phone: string;
  role: Role;
  status: Status;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

interface IUserPayload {
  firstname: string;
  lastname: string;
  password?: string;
  avatar: string;
  address?: string;
  email: string;
  phone: string;
  role: Role;
  status: Status;
}
