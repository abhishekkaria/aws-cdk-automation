// RDSManager.ts
import { RDS } from 'aws-sdk';

class RDSManager {
  private rds: RDS;

  constructor() {
    this.rds = new RDS();
  }

  async createRDSInstance(instanceIdentifier: string): Promise<void> {
    const params: RDS.CreateDBInstanceMessage = {
      DBInstanceIdentifier: instanceIdentifier,
      AllocatedStorage: 20,
      DBInstanceClass: 'db.t3.micro',
      Engine: 'postgres',
      MasterUsername: 'postgres',
      MasterUserPassword: 'admin123',
      BackupRetentionPeriod: 7,
      MultiAZ: false,
      PubliclyAccessible: true, // Make the instance publicly accessible
      Tags: [{ Key: 'Name', Value: instanceIdentifier }],
    };

    const response = await this.rds.createDBInstance(params).promise();
    console.log(`RDS instance ${instanceIdentifier} created successfully.`);
     // Extract relevant details
     const endpoint = response.DBInstance?.Endpoint?.Address;
     const port = response.DBInstance?.Endpoint?.Port;
     const username = params.MasterUsername;
     const password = params.MasterUserPassword;
 
     console.log('Endpoint URL:', endpoint);
     console.log('Port:', port);
     console.log('Username:', username);
     console.log('Password:', password);
  }

  // async enableCloudWatchLogs(instanceIdentifier: string): Promise<void> {
  //   const params: RDS.AddSourceIdentifierToSubscriptionMessage = {
  //     SourceIdentifier: instanceIdentifier,
  //     SubscriptionName: 'CloudWatchLogsSubscription',
  //   };

  //   await this.rds.addSourceIdentifierToSubscription(params).promise();
  //   console.log(`CloudWatch Logs enabled for RDS instance ${instanceIdentifier}.`);
  // }
}

export default RDSManager;
