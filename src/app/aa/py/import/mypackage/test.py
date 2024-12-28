import os
import sys
import util
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print(f"BASE_DIR: {BASE_DIR}")
sys.path.append(BASE_DIR)
import testsrc.config