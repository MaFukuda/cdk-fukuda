
import os
import json
import boto3
import datetime

translate = boto3.client(service_name='translate')
dynamodb = boto3.resource('dynamodb')

table_name = os.environ['HISTORY_TABLE']
print('table: '+table_name )
table = dynamodb.Table(table_name)

def handler(event, context):
    print('request: {}'.format(json.dumps(event)))


    query_parameters=event.get('queryStringParameters')
    print('query_parameters: {}'.format(json.dumps(query_parameters)))

    input_text=query_parameters.get("input_text")
    if input_text is None:
        input_text="入力がありません。"
    
    result = translate.translate_text(Text=input_text, 
            SourceLanguageCode="ja", TargetLanguageCode="en")
    
    output_text=result.get('TranslatedText')
    print('TranslatedText:'+output_text)

    table.put_item(
        Item={
            'timestamp':  datetime.datetime.now().strftime("%Y%m%d-%H%M%S"),
            'input_text': input_text,
            'output_text': output_text
        }
    )

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/plain'
        },
        'body': 'translated: ' + output_text
    }


