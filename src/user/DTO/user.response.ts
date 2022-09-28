import { UserEntity } from '../entities/user.entity';

export class UserResponse {
  success?: boolean;
  page?: number;
  total_pages?: number;
  total_users?: number;
  count?: number;
  links?: {
    next_url?: string;
    prev_url?: string;
  };
  users?: UserEntity[];
}
