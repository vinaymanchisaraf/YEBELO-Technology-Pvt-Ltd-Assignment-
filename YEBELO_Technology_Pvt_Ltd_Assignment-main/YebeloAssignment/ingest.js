const fs = require('fs');
const csv = require('csv-parser');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({ brokers: ['localhost:9092'] });
const producer = kafka.producer();

async function run() {
  try {
    // Check if CSV exists
    if (!fs.existsSync('trades_data.csv')) {
      console.error('ERROR: trades_data.csv not found!');
      process.exit(1);
    }

    await producer.connect();

    const messages = [];

    fs.createReadStream('trades_data.csv')
      .pipe(csv())
      .on('data', (row) => {
        messages.push({ value: JSON.stringify(row) });
      })
      .on('end', async () => {
        if (messages.length > 0) {
          await producer.send({
            topic: 'trade-data',
            messages,
          });
          console.log('CSV data sent to Redpanda!');
        } else {
          console.log('No data found in CSV.');
        }
        await producer.disconnect();
      })
      .on('error', (err) => {
        console.error('Error reading CSV:', err);
      });
  } catch (err) {
    console.error('Producer error:', err);
  }
}

run();
