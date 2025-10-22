
```py
import websocket
import json

def on_message(ws, message):
    data = json.loads(message)
    if 'cmd' in data and data['cmd'] == 'DANMU_MSG':
        print("弹幕:", data['info'][1])

def on_error(ws, error):
    print("Error:", error)

def on_close(ws):
    print("Connection closed")

def on_open(ws):
    # 发送加入房间的消息
    room_id = 123456  # 替换为实际的房间 ID
    join_msg = {
        "roomid": room_id,
        "protover": 1,
        "platform": "web",
        "clientver": "1.4.0"
    }
    ws.send(json.dumps(join_msg))

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("wss://broadcastlv.chat.bilibili.com:2245/sub",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    ws.on_open = on_open
    ws.run_forever()
```
