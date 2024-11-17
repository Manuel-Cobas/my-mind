import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotifsService } from './notifs.service';
import { CreateNotifDto } from './dto/create-notif.dto';
import { UpdateNotifDto } from './dto/update-notif.dto';

@Controller('notifs')
export class NotifsController {
  constructor(private readonly notifsService: NotifsService) {}

  @Post()
  create(@Body() createNotifDto: CreateNotifDto) {
    return this.notifsService.create(createNotifDto);
  }

  @Get()
  findAll() {
    return this.notifsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notifsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotifDto: UpdateNotifDto) {
    return this.notifsService.update(+id, updateNotifDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notifsService.remove(+id);
  }
}
