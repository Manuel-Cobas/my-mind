import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { RemindersModule } from './reminders/reminders.module';
import { SectionsModule } from './sections/sections.module';
import { NotifsModule } from './notifs/notifs.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UsersModule,
    ProfilesModule,
    RemindersModule,
    SectionsModule,
    AuthModule,
    NotifsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
