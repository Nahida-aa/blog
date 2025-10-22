# database.py

import sqlite3
from datetime import datetime
import queue
import threading

class Database:
    def __init__(self):
        self.conn = sqlite3.connect('streetlights.db', check_same_thread=False)
        self.create_table()
        self.queue = queue.Queue()
        self.worker_thread = threading.Thread(target=self._worker, daemon=True)
        self.worker_thread.start()

    def create_table(self):
        cursor = self.conn.cursor()
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS status_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device_id INTEGER,
            temperature REAL,
            humidity REAL,
            light REAL,
            is_on BOOLEAN,
            timestamp DATETIME
        )
        ''')
        self.conn.commit()

    def _worker(self):
        while True:
            function, args, kwargs, result_queue = self.queue.get()
            try:
                result = function(*args, **kwargs)
                if result_queue:
                    result_queue.put(result)
            except Exception as e:
                if result_queue:
                    result_queue.put(e)
            finally:
                self.queue.task_done()

    def _execute(self, function, *args, **kwargs):
        result_queue = queue.Queue()
        self.queue.put((function, args, kwargs, result_queue))
        result = result_queue.get()
        if isinstance(result, Exception):
            raise result
        return result

    def insert_status(self, device_id, temperature, humidity, light, is_on):
        def _insert():
            cursor = self.conn.cursor()
            cursor.execute('''
            INSERT INTO status_history (device_id, temperature, humidity, light, is_on, timestamp)
            VALUES (?, ?, ?, ?, ?, ?)
            ''', (device_id, temperature, humidity, light, is_on, datetime.now()))
            self.conn.commit()
        self._execute(_insert)

    def query_history(self, device_id, start_time, end_time):
        def _query():
            cursor = self.conn.cursor()
            cursor.execute('''
            SELECT * FROM status_history
            WHERE device_id = ? AND timestamp BETWEEN ? AND ?
            ''', (device_id, start_time, end_time))
            return cursor.fetchall()
        return self._execute(_query)

    def close(self):
        self.queue.join()
        self.conn.close()