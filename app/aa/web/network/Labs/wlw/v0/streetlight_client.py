# streetlight_client.py

import socket
import time
import tkinter as tk
from tkinter import ttk, simpledialog
import threading
from udp_protocol import *

class StreetlightClient:
    def __init__(self, server_address, network_interface=''):
        self.server_address = server_address
        self.device_id = None
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.sock.bind((network_interface, 0))  # Bind to the specified network interface
        self.ip, self.port = self.sock.getsockname()
        self.is_on = False
        self.is_running = False

        self.root = tk.Tk()
        self.root.title("路灯客户端")
        self.setup_ui()

    def setup_ui(self):
        self.root.geometry("300x350")
        self.root.resizable(False, False)
        
        style = ttk.Style()
        style.theme_use('clam')

        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        self.temp_var = tk.StringVar(value="温度: N/A")
        self.humidity_var = tk.StringVar(value="湿度: N/A")
        self.light_var = tk.StringVar(value="光照: N/A")
        self.status_var = tk.StringVar(value="状态: 关闭")
        self.id_var = tk.StringVar(value="设备ID: 未设置")
        self.ip_var = tk.StringVar(value=f"IP地址: {self.ip}")
        self.port_var = tk.StringVar(value=f"端口: {self.port}")

        ttk.Label(main_frame, textvariable=self.temp_var).grid(column=0, row=0, sticky=tk.W, pady=5)
        ttk.Label(main_frame, textvariable=self.humidity_var).grid(column=0, row=1, sticky=tk.W, pady=5)
        ttk.Label(main_frame, textvariable=self.light_var).grid(column=0, row=2, sticky=tk.W, pady=5)

        self.status_label = ttk.Label(main_frame, textvariable=self.status_var, background="red")
        self.status_label.grid(column=0, row=3, sticky=(tk.W, tk.E), pady=10)

        ttk.Label(main_frame, textvariable=self.id_var).grid(column=0, row=4, sticky=tk.W, pady=5)
        ttk.Label(main_frame, textvariable=self.ip_var).grid(column=0, row=5, sticky=tk.W, pady=5)
        ttk.Label(main_frame, textvariable=self.port_var).grid(column=0, row=6, sticky=tk.W, pady=5)

        button_frame = ttk.Frame(main_frame)
        button_frame.grid(column=0, row=7, sticky=(tk.W, tk.E), pady=10)

        self.start_button = ttk.Button(button_frame, text="启动", command=self.start)
        self.start_button.pack(side=tk.LEFT, padx=(0, 10))

        self.stop_button = ttk.Button(button_frame, text="停止", command=self.stop, state=tk.DISABLED)
        self.stop_button.pack(side=tk.LEFT, padx=(0, 10))

        self.set_id_button = ttk.Button(button_frame, text="设置ID", command=self.set_device_id)
        self.set_id_button.pack(side=tk.LEFT)

    def set_device_id(self):
        new_id = simpledialog.askinteger("设置设备ID", "请输入新的设备ID (1-1000):", minvalue=1, maxvalue=1000)
        if new_id:
            self.device_id = new_id
            self.id_var.set(f"设备ID: {self.device_id}")
            self.root.title(f"路灯客户端 {self.device_id}")

    def start(self):
        if not self.device_id:
            tk.messagebox.showerror("错误", "请先设置设备ID")
            return
        if not self.is_running:
            self.is_running = True
            self.start_button.config(state=tk.DISABLED)
            self.stop_button.config(state=tk.NORMAL)
            self.set_id_button.config(state=tk.DISABLED)
            threading.Thread(target=self.update_status, daemon=True).start()
            threading.Thread(target=self.receive_commands, daemon=True).start()

    def stop(self):
        self.is_running = False
        self.start_button.config(state=tk.NORMAL)
        self.stop_button.config(state=tk.DISABLED)
        self.set_id_button.config(state=tk.NORMAL)

    def update_status(self):
        while self.is_running:
            temperature, humidity, light = generate_sensor_data()
            self.temp_var.set(f"温度: {temperature:.2f}°C")
            self.humidity_var.set(f"湿度: {humidity:.2f}%")
            self.light_var.set(f"光照: {light:.2f} lux")

            packet = create_status_packet(self.device_id, temperature, humidity, light, self.is_on)
            self.sock.sendto(packet.to_bytes(), self.server_address)

            time.sleep(1)

    def receive_commands(self):
        while self.is_running:
            try:
                self.sock.settimeout(1.0)
                data, _ = self.sock.recvfrom(1024)
                packet = Packet.from_bytes(data)
                if packet.packet_type == CONTROL_COMMAND:
                    command = parse_control_packet(packet)
                    self.is_on = bool(command)
                    self.root.after(0, self.update_status_display)
                    
                    # Send ACK
                    ack_packet = create_ack_packet(self.device_id)
                    self.sock.sendto(ack_packet.to_bytes(), self.server_address)
            except socket.timeout:
                pass
            except Exception as e:
                print(f"Error receiving command: {e}")

    def update_status_display(self):
        if self.is_on:
            self.status_var.set("状态: 开启")
            self.status_label.config(background="green")
        else:
            self.status_var.set("状态: 关闭")
            self.status_label.config(background="red")

    def run(self):
        self.root.mainloop()

if __name__ == "__main__":
    server_address = ('192.168.56.1', 12345)  # 替换为实际的服务器IP地址
    
    # 为不同的虚拟网络创建客户端实例
    clients = [
        StreetlightClient(server_address, '192.168.56.1'),  # VirtualBox Host-Only Network
        # StreetlightClient(server_address, '192.168.11.1'),  # VMware Network Adapter VMnet1
        # StreetlightClient(server_address, '192.168.226.1'), # VMware Network Adapter VMnet8
        # StreetlightClient(server_address, '10.15.0.242')    # Wireless LAN adapter WLAN
    ]

    # 运行所有客户端
    for client in clients:
        client.run()