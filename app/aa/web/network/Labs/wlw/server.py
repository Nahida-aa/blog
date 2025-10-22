import socket
import threading
import tkinter as tk
from tkinter import scrolledtext, messagebox

class ServerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Server")
        
        # 上: 所连接终端列表
        self.terminal_list_label = tk.Label(root, text="所连接终端列表")
        self.terminal_list_label.grid(row=0, column=0, columnspan=2, padx=5, pady=5)
        
        self.terminal_list = tk.Listbox(root, width=50, height=10)
        self.terminal_list.grid(row=1, column=0, columnspan=2, padx=5, pady=5)
        
        self.on_button = tk.Button(root, text="开灯", command=self.turn_on, bg="green")
        self.on_button.grid(row=1, column=2, padx=5, pady=5)
        
        self.off_button = tk.Button(root, text="关灯", command=self.turn_off, bg="red")
        self.off_button.grid(row=2, column=2, padx=5, pady=5)
        
        # 中: 上传数据包列表和下发数据包列表
        self.upload_list_label = tk.Label(root, text="上传数据包列表")
        self.upload_list_label.grid(row=3, column=0, columnspan=2, padx=5, pady=5)
        
        self.upload_list = scrolledtext.ScrolledText(root, width=50, height=10)
        self.upload_list.grid(row=4, column=0, columnspan=2, padx=5, pady=5)
        
        self.download_list_label = tk.Label(root, text="下发数据包列表")
        self.download_list_label.grid(row=3, column=2, columnspan=2, padx=5, pady=5)
        
        self.download_list = scrolledtext.ScrolledText(root, width=50, height=10)
        self.download_list.grid(row=4, column=2, columnspan=2, padx=5, pady=5)
        
        # 下: 启动服务和停止服务按钮
        self.start_button = tk.Button(root, text="启动服务", command=self.start_server, bg="green")
        self.start_button.grid(row=5, column=0, padx=5, pady=5)
        
        self.stop_button = tk.Button(root, text="停止服务", command=self.stop_server, bg="red")
        self.stop_button.grid(row=5, column=1, padx=5, pady=5)
        
        self.server_socket = None
        self.running = False
        self.clients = {}

    def start_server(self):
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.server_socket.bind(('localhost', 10000))
        self.running = True
        threading.Thread(target=self.receive_data).start()
        self.upload_list.insert(tk.END, "服务器已启动\n")

    def stop_server(self):
        self.running = False
        if self.server_socket:
            self.server_socket.close()
        self.upload_list.insert(tk.END, "服务器已停止\n")

    def receive_data(self):
        while self.running:
            try:
                data, address = self.server_socket.recvfrom(4096)
                message = data.decode()
                device_id, temperature, humidity, illumination = message.split(',')
                self.clients[device_id] = (address, temperature, humidity, illumination, "关")
                self.update_terminal_list()
                self.upload_list.insert(tk.END, f"Received from {device_id}: 温度={temperature}, 湿度={humidity}, 照度={illumination}\n")
            except OSError:
                break

    def update_terminal_list(self):
        self.terminal_list.delete(0, tk.END)
        for device_id, (address, temperature, humidity, illumination, status) in self.clients.items():
            self.terminal_list.insert(tk.END, f"{device_id} - 温度: {temperature}, 湿度: {humidity}, 照度: {illumination}, 状态: {status}")

    def turn_on(self):
        self.send_command("ON")

    def turn_off(self):
        self.send_command("OFF")

    def send_command(self, command):
        selected = self.terminal_list.curselection()
        if not selected:
            messagebox.showwarning("警告", "请选择一个设备")
            return
        device_id = self.terminal_list.get(selected[0]).split(' ')[0]
        address = self.clients[device_id][0]
        self.server_socket.sendto(command.encode(), address)
        self.download_list.insert(tk.END, f"Sent {command} to {device_id}\n")
        self.clients[device_id] = (*self.clients[device_id][:4], "开" if command == "ON" else "关")
        self.update_terminal_list()

if __name__ == "__main__":
    root = tk.Tk()
    app = ServerApp(root)
    root.mainloop()