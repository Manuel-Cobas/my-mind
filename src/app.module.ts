import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { RemindersModule } from './reminders/reminders.module';
import { SectionsModule } from './sections/sections.module';
import { AuthModule } from './auth/auth.module';
import { NotifsModule } from './notifs/notifs.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, ProfilesModule, RemindersModule, SectionsModule, AuthModule, NotifsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
