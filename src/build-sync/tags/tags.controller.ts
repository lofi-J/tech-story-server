import { Controller } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('api/build-sync/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
}
