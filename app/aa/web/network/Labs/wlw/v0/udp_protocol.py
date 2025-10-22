# udp_protocol.py

import struct
import random

# Packet types
STATUS_UPDATE = 1
CONTROL_COMMAND = 2
ACK = 3

class Packet:
    def __init__(self, packet_type, device_id, data):
        self.packet_type = packet_type
        self.device_id = device_id
        self.data = data

    def to_bytes(self):
        header = struct.pack('!BI', self.packet_type, self.device_id)
        return header + self.data

    @classmethod
    def from_bytes(cls, packet_bytes):
        packet_type, device_id = struct.unpack('!BI', packet_bytes[:5])
        data = packet_bytes[5:]
        return cls(packet_type, device_id, data)

def create_status_packet(device_id, temperature, humidity, light, is_on):
    data = struct.pack('!fffB', temperature, humidity, light, is_on)
    return Packet(STATUS_UPDATE, device_id, data)

def create_control_packet(device_id, command):
    data = struct.pack('!B', command)
    return Packet(CONTROL_COMMAND, device_id, data)

def create_ack_packet(device_id):
    return Packet(ACK, device_id, b'')

def parse_status_packet(packet):
    temperature, humidity, light, is_on = struct.unpack('!fffB', packet.data)
    return temperature, humidity, light, bool(is_on)

def parse_control_packet(packet):
    return struct.unpack('!B', packet.data)[0]

def generate_sensor_data():
    return random.uniform(0, 40), random.uniform(0, 100), random.uniform(0, 1000)