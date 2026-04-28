require('dotenv').config();
const { prisma } = require('./lib/db');

async function test() {
  try {
    console.log('Testing prisma connection...');
    const count = await prisma.galleryEvent.count();
    console.log('Success! Count:', count);
  } catch (err) {
    console.error('Test failed:', err);
  }
}

test();
