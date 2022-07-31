import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  ping(): string {
    return 'Valuecase API – Time = ' + new Date().toISOString();
  }
}
