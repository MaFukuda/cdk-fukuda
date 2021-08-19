import * as apigateway from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import { App,  Duration, Stack, StackProps } from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';

export class CdkFukudaLambdaStack extends Stack {
    constructor(scope: App, id: string, props: StackProps) {
        super(scope, id, props);

        // DynamoDB table to store item: {id: <ID>, name: <NAME>}
        const table = new dynamodb.Table(this, 'SampleTable', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            readCapacity: 2,
            writeCapacity: 2
        });

        const environment = { SAMPLE_TABLE: table.tableName };

//     assumedBy: new iam.ServicePrincipal('translate.amazonaws.com'),

        const state = new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            resources: ['*'],
            actions: [            
                'ecr:GetAuthorizationToken',
                'ecr:BatchCheckLayerAvailability',
                'ecr:GetDownloadUrlForLayer',
                'ecr:BatchGetImage',
                'logs:CreateLogStream',
                'logs:PutLogEvents'
            ]
         });
       

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
        }
        
        //  assumedBy: new iam.ServicePrincipal('sns.amazonaws.com'),
    
     

       // translate_function.addToRolePolicy(state);


        //table.grantReadWriteData(putItemFunction);

        const api = new apigateway.RestApi(this, 'ServerlessRestApi', { cloudWatchRole: false });
        api.root.addMethod('GET', new apigateway.LambdaIntegration(translate_function));

    }
}

