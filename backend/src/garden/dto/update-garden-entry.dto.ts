import { PartialType } from '@nestjs/swagger';
import { CreateGardenEntryDto } from './create-garden-entry.dto';

export class UpdateGardenEntryDto extends PartialType(CreateGardenEntryDto) {}
