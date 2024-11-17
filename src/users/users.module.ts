import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...usersProviders, UsersService],
})
export class UsersModule {}
