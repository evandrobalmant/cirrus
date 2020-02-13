# Cirrus

Lambda@edge responsável por padronizar urls de request para o S3 com barra no final.


**Invocar local**

```
$ sls invoke local --function origin-request --path local/cf-event.json 
```


**Deploy**

STG

```
$ npm run deploy:stg
```

PRD

```
$ npm run deploy:prd
```

**OBSERVAÇÃO: Após deploy precisa atualizar a versão do gatilho na Lambda!


**Gerar Evento de teste do CloudFront**
```
$ sam local generate-event cloudfront response-generation
```

## Permissões necessárias

**IAM Role - Relação de confiança**

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com",
          "edgelambda.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

**Police: arn:aws:iam::99999999:policy/lambdaedge-cirrus-police**

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "lambda:GetFunction",
                "lambda:EnableReplication",
                "iam:CreateServiceLinkedRole",
                "cloudfront:UpdateDistribution",
                "cloudwatch:*"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ]
}
```

### Referências

- [https://github.com/silvermine/serverless-plugin-cloudfront-lambda-edge](https://github.com/silvermine/serverless-plugin-cloudfront-lambda-edge)
- [https://github.com/awsdocs/amazon-cloudfront-developer-guide/blob/master/lambda-edge-permissions.md](https://github.com/awsdocs/amazon-cloudfront-developer-guide/blob/master/lambda-edge-permissions.md)
