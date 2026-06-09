import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API de CRUD de Usuários com NestJS + Prisma. Acesse /api para a documentação Swagger.';
  }
}
