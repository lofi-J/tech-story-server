import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  getAllUsers(): User[] {
    // 임시 데이터 - 실제로는 데이터베이스에서 가져와야 함
    return [
      {
        id: '1',
        email: 'user1@example.com',
        name: 'User One',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        email: 'user2@example.com',
        name: 'User Two',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  @Query(() => User, { nullable: true })
  getUserById(@Args('id') id: string): User | null {
    // 임시 데이터 - 실제로는 데이터베이스에서 가져와야 함
    const users = [
      {
        id: '1',
        email: 'user1@example.com',
        name: 'User One',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        email: 'user2@example.com',
        name: 'User Two',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return users.find((user) => user.id === id) || null;
  }
}
