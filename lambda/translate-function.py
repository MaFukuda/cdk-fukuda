

import json
import boto3

translate = boto3.client(service_name='translate')

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
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/plain'
        },
        'body': 'translated: ' + output_text
    }

