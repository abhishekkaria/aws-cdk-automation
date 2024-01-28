// index.ts
import RDSManager from './RDSManager';
import { config } from 'aws-sdk';

async function main() {
    // Set AWS SDK configuration
    config.update({
        region: 'us-east-1',
        credentials: {
          accessKeyId: 'AKIA4VN54B53Y4ZOQBNK',
          secretAccessKey: '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',
        },
    });

    const instanceIdentifier = 'rds-postgres-2'; // Change this to a unique identifier

    const rdsManager = new RDSManager();

    try {
    // Create RDS instance
    await rdsManager.createRDSInstance(instanceIdentifier);

    // Enable CloudWatch logs
    // await rdsManager.enableCloudWatchLogs(instanceIdentifier);
    } catch (error) {
    console.error('Error:', error);
    }
}

main();
