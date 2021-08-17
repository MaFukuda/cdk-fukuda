#!/bin/sh

ARN="arn:aws:sns:ap-northeast-1:964922594927:CdkFukudaSnsStack-EmailCdkTopicCEB99D23-1UKANRHJA3GVJ"
#ARN="arn:aws:sns:ap-northeast-1:964922594927:CdkFukudaSnsStack-HelloCdkTopic1F583424-1LF9X1FELW2S0"


aws sns publish --topic-arn $ARN --message "Hello World!"

