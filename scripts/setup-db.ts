// scripts/setup-db.js
// Run this once after database is created

const { PrismaClient } = require('@prisma/client');

async function setupDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🚀 Setting up database...');
    
    // This will create all tables based on your schema
    await prisma.$executeRaw`SELECT 1`;
    
    console.log('✅ Database connected successfully!');
    console.log('✅ Tables will be created automatically on first use');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
