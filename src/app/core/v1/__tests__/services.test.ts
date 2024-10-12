import prisma from '@/client';
import { prismaMock } from '@/singleton';
import { createUser, fetchUserByUsername, updateUser } from '../services';

describe("UserService", () => {

  test('should create user', async () => {
    const userRecord = {
      id: 1,
      username: 'rich',
      password: '123456Zz',
      name: 'Rich',
      qq: '123456',
      email: '123456@qq.com',
      phone: '13312341234',
    }

    const userIn = {
      username: 'rich',
      password: '123456Zz',
      name: 'Rich',
      qq: '123456',
      email: '123456@qq.com',
      phone: '13312341234',
    }

    prismaMock.user.create.mockResolvedValue(userRecord);
    await expect(createUser(prisma, userIn)).resolves.toEqual(userRecord);


  });

  test('should fetch user', async () => {
    const username = "rich";
    const userRecord = {
      id: 1,
      username: 'rich',
      password: '123456Zz',
      name: 'Rich',
      qq: '123456',
      email: '123456@qq.com',
      phone: '13312341234',
    }

    prismaMock.user.findUnique.mockResolvedValue(userRecord);

    await expect(fetchUserByUsername(prisma, username)).resolves.toEqual(userRecord)
  });

  test('should update user', async () => {
    const id = 1;
    const userIn = {
      username: 'rich',
      name: 'Rich Haines',
      password: '123456Zz',
      qq: '123456',
      email: '123456@qq.com',
      phone: '13312341234',
    };
    const userRecord = {
      id: 1,
      username: 'rich',
      password: '123456Zz',
      name: 'Rich Haines',
      qq: '123456',
      email: '123456@qq.com',
      phone: '13312341234',
    }

    prismaMock.user.update.mockResolvedValue(userRecord)

    await expect(updateUser(prisma, id, userIn)).resolves.toEqual(userRecord)
  });
})


