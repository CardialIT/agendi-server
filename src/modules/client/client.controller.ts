import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDTO } from 'src/modules/client/client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('/create')
  async create(@Body() data: ClientDTO) {
    return this.clientService.create(data);
  }

  @Get('/listAll')
  async findAll() {
    return this.clientService.findAll();
  }
}