import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:5000', 'http://127.0.0.1:5000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })

  await app.listen(8000, '0.0.0.0')
  console.log('Server is running on http://0.0.0.0:8000')
}

bootstrap()
