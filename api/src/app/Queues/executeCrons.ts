import cron from 'node-cron';
import { executeQueueAssetUpdates } from './queueExecutables';

// Simulate an async operation
async function someAsyncOperation() {
  console.log('\nopration 1 is running');
  return new Promise(resolve => setTimeout(resolve, 2000));
}

export async function anotherOne() {
  console.log('\operation 2 is running');
  
  return new Promise(resolve => setTimeout(resolve, 2000));
}


export async function assetUpdatesCron(scheduleTime = '*/10 * * * * *') {

  let isAssetUpdateCronRunning = false;

  const assetUpdatesCronSchedule = cron.schedule(scheduleTime, async () => {

    if (isAssetUpdateCronRunning) return;

    isAssetUpdateCronRunning = true;

    await someAsyncOperation();
    // await executeQueueAssetUpdates();

    // This function will run every minute
    console.log('\nCron job executed at:', new Date().toLocaleString());

    isAssetUpdateCronRunning = false;

    await anotherOne()
  });

  assetUpdatesCronSchedule.start();
}