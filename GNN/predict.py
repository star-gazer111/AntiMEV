import requests

api_url = 'Add your endpoint'

input_data = {
       'block': 15588120,
       'tx_hash': '0x0008ac8ed579da296386269454d28cb6754386a25dd66243abe9ab8daef0e930'
   }

   # Send POST request to the API endpoint
response = requests.post(api_url, json=input_data)

   # Check if request was successful (status code 200)
if response.status_code == 200:
       print(response.json())
else:
       print('Error:', response.status_code, response.text)
