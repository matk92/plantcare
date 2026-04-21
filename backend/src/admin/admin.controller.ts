import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AdminService } from './admin.service';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiOperation({ summary: 'liste tous les users (admin)' })
  listUsers() {
    return this.adminService.listUsers();
  }

  @Get('gardens')
  @ApiOperation({ summary: 'liste tous les jardins (admin support)' })
  listGardens() {
    return this.adminService.listGardens();
  }
}
