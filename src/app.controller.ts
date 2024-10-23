import { Controller, Get, Req, UseGuards, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/protected')
  @UseGuards(JwtAuthGuard)
  async protected(@Req() req) {
    return {
      "message": "AuthGuard works 🎉",
      "authenticated_user": req.user
    };
  }

  @Get("/real")
  @UseGuards(JwtAuthGuard)
  test(@Req() req){
    return this.appService.getTable()
  }

  @Post("/insert")
  @UseGuards(JwtAuthGuard)
  insert (@Req() req, @Body() body){
    
    return this.appService.addRecordRow(body)
  }
 
}
