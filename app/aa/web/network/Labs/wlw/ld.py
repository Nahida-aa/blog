import socket
import random
import time
import threading
import tkinter as tk

class ClientApp:
    def __init__(self, root, device_id, device_ip):
        self.root = root
        self.root.title(f"Client {device_id}")
        
        self.device_id = device_id
        self.device_ip = device_ip
        self.server_address = ('localhost', 10000)
        self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        
        # 第一行显示温度、湿度、照度
        self.temp_label = tk.Label(root, text="温度: ")
        self.temp_label.grid(row=0, column=0, padx=5, pady=5)
        
        self.humidity_label = tk.Label(root, text="湿度: ")
        self.humidity_label.grid(row=0, column=1, padx=5, pady=5)
        
        self.illumination_label = tk.Label(root, text="照度: ")
        self.illumination_label.grid(row=0, column=2, padx=5, pady=5)
        
        # 第二行显示灯的开关状态(用颜色区分)
        self.status_label = tk.Label(root, text="状态: 关", bg="red", width=20)
        self.status_label.grid(row=1, column=0, columnspan=3, padx=5, pady=5)
        
        # 第三行显示设备地址，工作按钮，停止按钮
        self.device_label = tk.Label(root, text=f"设备地址: {device_ip}")
        self.device_label.grid(row=2, column=0, padx=5, pady=5)
        
        self.start_button = tk.Button(root, text="工作", command=self.start_working, bg="yellow")
        self.start_button.grid(row=2, column=1, padx=5, pady=5)
        
        self.stop_button = tk.Button(root, text="停止", command=self.stop_working, bg="red")
        self.stop_button.grid(row=2, column=2, padx=5, pady=5)
        
        self.working = False

    def generate_sensor_data(self):
        temperature = random.uniform(20.0, 30.0)
        humidity = random.uniform(30.0, 70.0)
        illumination = random.uniform(300.0, 800.0)
        return temperature, humidity, illumination

    def start_working(self):
        self.working = True
        threading.Thread(target=self.send_data).start()

    def stop_working(self):
        self.working = False

    def send_data(self):
        while self.working:
            temperature, humidity, illumination = self.generate_sensor_data()
            message = f"{self.device_id},{temperature:.2f},{humidity:.2f},{illumination:.2f}"
            self.client_socket.sendto(message.encode(), self.server_address)
            self.temp_label.config(text=f"温度: {temperature:.2f}")
            self.humidity_label.config(text=f"湿度: {humidity:.2f}")
            self.illumination_label.config(text=f"照度: {illumination:.2f}")
            self.status_label.config(text="状态: 开", bg="green")
            time.sleep(5)
        self.status_label.config(text="状态: 关", bg="red")

if __name__ == "__main__":
    root = tk.Tk()
    app = ClientApp(root, "lamp_001", "192.168.1.2")
    root.mainloop()