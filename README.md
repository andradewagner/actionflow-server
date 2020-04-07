Aplicaçao Backend para centralizar execuçao de testes automatizados

Necessário clonar o frontend da aplicaçao para executar corretamente.

## Scripts disponíveis

### `npm start`

# Apis expostas:

## http://localhost:3001/api/auto

Cadastra um novo teste. Corpo da requisiçao:

Método: POST

Body:
```json
{
    "app": "CNP",
    "features": [
    	{"name": "Login", "executionTime": 3, "screenshot": "", "status": "fineshed", "log": ["botao login"]}, 
    	{"name": "Painel", "executionTime": 5, "screenshot": "", "status": "fineshed", "log": ["Saldo"]},
    	{"name": "Admin", "executionTime": 5, "screenshot": "dara.jpg", "status": "error", "log": ["Saldo"]},
    	{"name": "Console", "executionTime": 5, "screenshot": "", "status": "notprocessed", "log": ["Saldo"]},
    	{"name": "Users", "executionTime": 5, "screenshot": "", "status": "notprocessed", "log": ["Saldo"]}, 
    	{"name": "Extrato", "executionTime": 2, "screenshot": "", "status": "notprocessed", "log": ["pdf"]}
    ]
}
```

## http://localhost:3001/api/upload

Método POST:
Body type: form-data
key: archive, valor: arquivo a ser carregado

Faz upload de arquivo de imagem para exibir no popup. Exemplo de requisiçao
