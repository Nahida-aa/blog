# server.py

import socket
import tkinter as tk
from tkinter import ttk
import threading
from udp_protocol import *
from database import Database
import time

class Server:
    def __init__(self):
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.sock.bind(('0.0.0.0', 12345))
        self.clients = {}
        self.is_running = False
        self.db = Database()

        self.root = tk.Tk()
        self.root.title("路灯服务器")
        self.setup_ui()

    def setup_ui(self):
        self.root.geometry("1000x600")
        
        style = ttk.Style()
        style.theme_use('clam')

        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)

        # 客户端列表
        client_frame = ttk.LabelFrame(main_frame, text="连接的路灯", padding="5")
        client_frame.grid(row=0, column=0, columnspan=2, sticky=(tk.W, tk.E, tk.N, tk.S), pady=(0, 10))
        main_frame.columnconfigure(0, weight=1)
        main_frame.rowconfigure(0, weight=1)

        self.client_tree = ttk.Treeview(client_frame, columns=('ID', 'Address', 'Temperature', 'Humidity', 'Light', 'Status', 'LastUpdate'))
        self.client_tree.heading('ID', text='设备ID')
        self.client_tree.heading('Address', text='设备地址')
        self.client_tree.heading('Temperature', text='温度')
        self.client_tree.heading('Humidity', text='湿度')
        self.client_tree.heading('Light', text='光照')
        self.client_tree.heading('Status', text='状态')
        self.client_tree.heading('LastUpdate', text='最后更新')
        self.client_tree.column('#0', width=0, stretch=tk.NO)
        self.client_tree.column('ID', width=60, anchor=tk.CENTER)
        self.client_tree.column('Address', width=150, anchor=tk.CENTER)
        self.client_tree.column('Temperature', width=80, anchor=tk.CENTER)
        self.client_tree.column('Humidity', width=80, anchor=tk.CENTER)
        self.client_tree.column('Light', width=80, anchor=tk.CENTER)
        self.client_tree.column('Status', width=80, anchor=tk.CENTER)
        self.client_tree.column('LastUpdate', width=150, anchor=tk.CENTER)
        self.client_tree.pack(fill=tk.BOTH, expand=True)

        # 控制按钮
        control_frame = ttk.Frame(main_frame)
        control_frame.grid(row=1, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=(0, 10))
        
        self.on_button = ttk.Button(control_frame, text="开灯", command=self.turn_on_selected)
        self.on_button.pack(side=tk.LEFT, padx=(0, 5))
        
        self.off_button = ttk.Button(control_frame, text="关灯", command=self.turn_off_selected)
        self.off_button.pack(side=tk.LEFT)

        # 数据包列表
        packet_frame = ttk.Frame(main_frame)
        packet_frame.grid(row=2, column=0, columnspan=2, sticky=(tk.W, tk.E, tk.N, tk.S), pady=(0, 10))
        main_frame.rowconfigure(2, weight=1)

        upload_frame = ttk.LabelFrame(packet_frame, text="上传数据包", padding="5")
        upload_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(0, 5))
        
        self.upload_list = tk.Listbox(upload_frame)
        self.upload_list.pack(fill=tk.BOTH, expand=True)
        
        download_frame = ttk.LabelFrame(packet_frame, text="下发数据包", padding="5")
        download_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)
        
        self.download_list = tk.Listbox(download_frame)
        self.download_list.pack(fill=tk.BOTH, expand=True)

        # 服务器控制
        server_frame = ttk.Frame(main_frame)
        server_frame.grid(row=3, column=0, columnspan=2, sticky=(tk.W, tk.E))
        
        self.start_button = ttk.Button(server_frame, text="启动服务器", command=self.start_server)
        self.start_button.pack(side=tk.LEFT, padx=(0, 5))
        
        self.stop_button = ttk.Button(server_frame, text="停止服务器", command=self.stop_server, state=tk.DISABLED)
        self.stop_button.pack(side=tk.LEFT)

    def start_server(self):
        self.is_running = True
        self.start_button.config(state=tk.DISABLED)
        self.stop_button.config(state=tk.NORMAL)
        threading.Thread(target=self.receive_data, daemon=True).start()
        threading.Thread(target=self.check_client_timeout, daemon=True).start()

    def stop_server(self):
        self.is_running = False
        self.start_button.config(state=tk.NORMAL)
        self.stop_button.config(state=tk.DISABLED)

    def receive_data(self):
        while self.is_running:
            try:
                self.sock.settimeout(1.0)
                data, addr = self.sock.recvfrom(1024)
                packet = Packet.from_bytes(data)
                
                if packet.packet_type == STATUS_UPDATE:
                    self.handle_status_update(addr, packet)
                elif packet.packet_type == ACK:
                    self.handle_ack(packet)
                
            except socket.timeout:
                pass
            except Exception as e:
                print(f"Error receiving data: {e}")

    def handle_status_update(self, addr, packet):
        temperature, humidity, light, is_on = parse_status_packet(packet)
        self.clients[packet.device_id] = {'addr': addr, 'last_update': time.time()}
        self.db.insert_status(packet.device_id, temperature, humidity, light, is_on)
        
        self.root.after(0, self.update_client_list, packet.device_id, addr, temperature, humidity, light, is_on)
        self.root.after(0, self.upload_list.insert, tk.END, f"状态更新 (设备 {packet.device_id}): 温度={temperature:.2f}, 湿度={humidity:.2f}, 光照={light:.2f}, 开启={is_on}")

    def handle_ack(self, packet):
        self.root.after(0, self.download_list.insert, tk.END, f"确认 (设备 {packet.device_id})")

    def update_client_list(self, device_id, addr, temperature, humidity, light, is_on):
        current_time = time.strftime("%Y-%m-%d %H:%M:%S")
        item_found = False
        for item in self.client_tree.get_children():
            if self.client_tree.item(item)['values'][0] == device_id:
                item_found = True
                self.client_tree.item(item, values=(device_id, f"{addr[0]}:{addr[1]}", f"{temperature:.2f}", f"{humidity:.2f}", f"{light:.2f}", "开启" if is_on else "关闭", current_time))
                break
        
        if not item_found:
            self.client_tree.insert('', tk.END, values=(device_id, f"{addr[0]}:{addr[1]}", f"{temperature:.2f}", f"{humidity:.2f}", f"{light:.2f}", "开启" if is_on else "关闭", current_time))

    def turn_on_selected(self):
        self.send_control_command(True)

    def turn_off_selected(self):
        self.send_control_command(False)

    def send_control_command(self, is_on):
        selected = self.client_tree.selection()
        if not selected:
            return
        
        device_id = int(self.client_tree.item(selected[0])['values'][0])
        if device_id not in self.clients:
            return
        
        packet = create_control_packet(device_id, int(is_on))
        self.sock.sendto(packet.to_bytes(), self.clients[device_id]['addr'])
        self.download_list.insert(tk.END, f"控制命令 (设备 {device_id}): {'开启' if is_on else '关闭'}")

    def check_client_timeout(self):
        while self.is_running:
            current_time = time.time()
            disconnected_clients = []
            for device_id, client_info in self.clients.items():
                if current_time - client_info['last_update'] > 5:  # 5秒超时
                    disconnected_clients.append(device_id)
            
            for device_id in disconnected_clients:
                del self.clients[device_id]
                self.root.after(0, self.remove_disconnected_client, device_id)
            
            time.sleep(1)

    def remove_disconnected_client(self, device_id):
        for item in self.client_tree.get_children():
            if self.client_tree.item(item)['values'][0] == device_id:
                self.client_tree.delete(item)
                break
        self.upload_list.insert(tk.END, f"设备 {device_id} 已断开连接")

    def run(self):
        self.root.mainloop()
        self.db.close()

if __name__ == "__main__":
    server = Server()
    server.run()