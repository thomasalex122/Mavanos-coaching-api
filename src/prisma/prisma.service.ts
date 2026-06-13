// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// Prisma client has info of schema.prisma 

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config'; // Ensures your .env variables are loaded securely

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 1. Establish a connection pool to your Neon cloud database
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    // 2. Initialize the official Prisma PostgreSQL adapter using that pool
    const adapter = new PrismaPg(pool);
    
    // 3. Pass the adapter configuration directly up to the parent PrismaClient
    super({ adapter });
  }

  async onModuleInit() {
    // Open the live connection line when NestJS starts up
    await this.$connect();
  }

  async onModuleDestroy() {
    // Cleanly close the connection line if the server shuts down
    await this.$disconnect();
  }
}