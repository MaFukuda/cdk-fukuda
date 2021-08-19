
import json
import boto3

translate = boto3.client(service_name='translate')

def handler(event, context):
    print('request: {}'.format(json.dumps(event)))
    
    input_text="おはようございます。いい天気ですね。"
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


