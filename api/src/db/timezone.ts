import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function setGlobalTimeZone() {
  try {
    await prisma.$executeRaw`SET @@global.time_zone = '+3:00';`;
    console.log('Global time zone has been set successfully.');
  } catch (error) {
    console.error('Error setting global time zone:', error);
  }
}

function executeCodeOnce() {
  
  const fs = require('fs');
  const path = require('path');
  
  const flagFilePath = path.resolve(__dirname, './db/timezone.json');

  if (fs.existsSync(flagFilePath)) {
    console.log('Code has already been executed.');
    return;
  }

  
  fs.writeFileSync(flagFilePath, JSON.stringify({ executed: true }));
  console.log('Code executed successfully.');

  setGlobalTimeZone();
}

// executeCodeOnce();