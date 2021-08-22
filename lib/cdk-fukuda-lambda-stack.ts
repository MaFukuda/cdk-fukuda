import * as apigateway from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import { App,  Duration, Stack, StackProps } from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as logs from '@aws-cdk/aws-logs';

export class CdkFukudaLambdaStack extends Stack {
    constructor(scope: App, id: string, props: StackProps) {
        super(scope, id, props);


        const table_name = 'translate-history';
        const table_id = 'translate history';
        const table = new dynamodb.Table(this, table_id, {
            tableName: table_name,
            partitionKey: { name: 'timestamp', type: dynamodb.AttributeType.STRING },
            readCapacity: 2,
            writeCapacity: 2
        });

        const environment = { HISTORY_TABLE: table.tableName };

        const translate_function = new lambda.Function(this, 'translate_function', {
            description: 'Translate module from Japanese to English.',
            handler: 'translate-function.handler',
            runtime: lambda.Runtime.PYTHON_3_8,
            code: lambda.Code.fromAsset('lambda'),
            environment,
            timeout: Duration.seconds(60),
        });


        const myRole = translate_function.role;
        if (myRole) {
            myRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('TranslateFullAccess'));
            myRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
        }
        // ToDO: 
        // 既にLog Groupが存在する時はエラーになるので、既存で存在する時はGetしてくるといった
        // 処理を盛り込んだ方が良い。
        // Delete policyで自動的に消えるかも。
        const log_group_id = 'translate api access log';
        const log_group_name = `/aws/apigateway/translate-api-access-log`;
        let restApiLogAccessLogGroup = logs.LogGroup.fromLogGroupName(this, 
            log_group_id, log_group_name
        );
        if (!restApiLogAccessLogGroup) {
            restApiLogAccessLogGroup = new logs.LogGroup(
                this,
                log_group_id,
                {
                  logGroupName: log_group_name,
                  retention: 365,
                },
            );
        }


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
