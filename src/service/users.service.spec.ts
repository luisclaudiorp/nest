import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IdAllDto } from 'src/validation/id-all.dto';
import TestUtil from '../common/test/testeUtil';
import { User } from '../model/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  const mockRepository = {
    //find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOneOrFail: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findByCpf', () => {
    it('should be list one user by cpf', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOne.mockReturnValue([user]);
      const users = await usersService.findByCpf(user.cpf);
      expect(users).toHaveLength(1);
    });
  });

  describe('findOneByEmail', () => {
    it('should be list one user by email', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOne.mockReturnValue(user);
      const users = await usersService.findByEmail(user.email);
      expect(users).toMatchObject({ email: user.email });
    });
  });

  describe('findOneById', () => {
    it('should be list one user by id', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOneOrFail.mockReturnValue(user);
      const users = await usersService.findOneById({ id: user.id });
      expect(users).toMatchObject({ id: user.id });
    });
  });
});
