import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";
import { UpdateUserDto } from './../dto/update-user.dto';



@Injectable()
export class UserRepository {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.prisma.user.create({
      data: createUserDto,
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true
          }
        }
      }
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany({
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true
          }
        }
      }
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true
          }
        }
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return await this.prisma.user.update({
      where: {
        id
      },
      data: updateUserDto,
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true
          }
        }
      }
    })
  }

  async remove(id: number): Promise<UserEntity> {
    return await this.prisma.user.delete({
      where: {
        id
      },
    })
  }
}
