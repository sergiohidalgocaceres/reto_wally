export interface IUser {
  email: string;
  password: string;
}

const users: IUser[] = [
  {
    email: 'user01@email.com',
    password: '$2a$10$F4zCuyRv2z7EeRS5BDicmuIZymxUkl7tvpfuGggdpAib6DXIEC8Vq',
  },
  {
    email: 'user02@email.com',
    password: '$2a$10$F4zCuyRv2z7EeRS5BDicmuIZymxUkl7tvpfuGggdpAib6DXIEC8Vq',
  },
  {
    email: 'user03@email.com',
    password: '$2a$10$F4zCuyRv2z7EeRS5BDicmuIZymxUkl7tvpfuGggdpAib6DXIEC8Vq',
  },
];

export class AuthEntity {
  async findByEmail(email: string): Promise<IUser | undefined> {
    return Promise.resolve(
      users.find((user) => {
        return user.email === email;
      }),
    );
  }
}
