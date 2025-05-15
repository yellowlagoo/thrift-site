const https = require('https');
const readline = require('readline');

// Create interface for command line input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fetch the current public IP
console.log('Fetching your current public IP address...');

https.get('https://api.ipify.org', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    const ip = data.trim();
    console.log(`\nYour current public IP address is: ${ip}`);
    console.log('\n===========================================================');
    console.log('Follow these steps to whitelist your IP in MongoDB Atlas:');
    console.log('===========================================================');
    console.log('1. Log in to your MongoDB Atlas account at https://cloud.mongodb.com');
    console.log('2. Select your project');
    console.log('3. Click on "Network Access" in the left sidebar');
    console.log('4. Click the "+ ADD IP ADDRESS" button');
    console.log(`5. Enter your IP address: ${ip}`);
    console.log('6. Add a description like "My Development Machine"');
    console.log('7. Click "Confirm"');
    console.log('8. Wait for the changes to be applied (usually takes a minute or two)');
    console.log('9. Restart your application with: npm run dev');
    console.log('===========================================================');
    
    rl.question('\nDo you want to view the sample connection string for your .env file? (y/n): ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        console.log('\n===========================================================');
        console.log('Add this to your .env file in the project root:');
        console.log('===========================================================');
        console.log('MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/thrift-site?retryWrites=true&w=majority');
        console.log('===========================================================');
        console.log('\nReplace <username> and <password> with your MongoDB Atlas credentials');
        console.log('If you need to find your connection string:');
        console.log('1. In MongoDB Atlas, click "Connect" on your cluster');
        console.log('2. Choose "Connect your application"');
        console.log('3. Select your driver and version');
        console.log('4. Copy the connection string');
      }
      
      rl.close();
    });
  });
}).on('error', (err) => {
  console.error('Error fetching IP address:', err.message);
  rl.close();
}); 