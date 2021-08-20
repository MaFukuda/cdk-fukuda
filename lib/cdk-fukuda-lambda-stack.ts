import * as apigateway from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import { App,  Duration, Stack, StackProps } from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as logs from '@aws-cdk/aws-logs';

export class CdkFukudaLambdaStack extends Stack {
    constructor(scope: App, id: string, props: StackProps) {
        super(scope, id, props);

        // DynamoDB table to store item: {id: <ID>, name: <NAME>}
        const table = new dynamodb.Table(this, 'translate-history', {
            partitionKey: { name: 'timestamp', type: dynamodb.AttributeType.STRING },
            readCapacity: 2,
            writeCapacity: 2
        });

        const environment = { SAMPLE_TABLE: table.tableName };


        const translate_function = new lambda.Function(this, 'translate_function', {
            description: 'Translate module from Japanese to English.',
            handler: 'translate-function.handler',
            runtime: lambda.Runtime.PYTHON_3_8,
            code: lambda.Code.fromAsset('lambda'),
            environment,
            timeout: Duration.seconds(60),
           // role: myRole
        });


        const myRole = translate_function.role;
        if (myRole) {
            myRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('TranslateFullAccess'));
            myRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
        }

        const restApiLogAccessLogGroup = new logs.LogGroup(
            this,
            'translate-api-access-log-group',
            {
              logGroupName: `/aws/apigateway/translate-api-access-log`,
              retention: 365,
            },
        );

        const api = new apigateway.RestApi(this, 'translate-api', { 
            cloudWatchRole: false,
            deployOptions: {
                dataTraceEnabled: true,
                loggingLevel: apigateway.MethodLoggingLevel.INFO,

                accessLogDestination: new apigateway.LogGroupLogDestination(
                  restApiLogAccessLogGroup,
                ),
                accessLogFormat: apigateway.AccessLogFormat.clf(),
            },
        });


        api.root.addMethod('GET', new apigateway.LambdaIntegration(translate_function));

    }
}

