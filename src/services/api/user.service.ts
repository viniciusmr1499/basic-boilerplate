import UserEntity from '@entities/api/user.entity';

interface IRequestDTO {
  email: string;
  password: string;
}

class UserService {
  public async authenticate({ email, password }: IRequestDTO): Promise<UserEntity> {
    // TODO 
    return {};
  }
}

export default UserService;
