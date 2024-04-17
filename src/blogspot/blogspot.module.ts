import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogspotController } from './blogspot.controller';
import { Module } from '@nestjs/common';
import { BPost } from './blogspot.entity';
import { BlogspotService } from './blogspot.service';

@Module({
  imports: [TypeOrmModule.forFeature([BPost])],
  controllers: [BlogspotController],
  providers: [BlogspotService],
  exports: [BlogspotService, TypeOrmModule],
})
export class BlogspotModule {}
