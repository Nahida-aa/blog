import requests

# response = requests.get("http://localhost:1234/v1/models")
# if response.status_code == 200:
#     models = response.json()
#     print("Available models:", models)
# else:
#     print("Failed to get models:", response.status_code)
    

# data = {
#     "model": "deepseek-r1-distill-qwen-1.5b",
#     "messages": [
#         {"role": "user", "content": "LM Studio 是什么, 这是他们官网的文档地址: https://lmstudio.ai/docs"},
#     ]
# }

# response = requests.post("http://localhost:1234/v1/chat/completions", json=data, stream=True)
# if response.status_code == 200:
#     print("Chat reply:")
#     for line in response.iter_lines():
#         if line:
#             decoded_line = line.decode('utf-8')
#             print(decoded_line)
# else:
#     print("Failed to get chat reply:", response.status_code)
    
    
from huggingface_hub import InferenceClient

client = InferenceClient(
	provider="hf-inference",
	api_key="hf_xxxxxxxxxxxxxxxxxxxxxxxx"
)

messages = [
	{
		"role": "user",
		"content": "What is the capital of France?"
	}
]

stream = client.chat.completions.create(
	model="deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B", 
	messages=messages, 
	max_tokens=500,
	stream=True
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="")