import { PartialType } from '@nestjs/mapped-types';
import { CreateNotifDto } from './create-notif.dto';

export class UpdateNotifDto extends PartialType(CreateNotifDto) {}
