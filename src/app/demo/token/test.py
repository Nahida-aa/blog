from enum import Enum, auto
import enum
def divide(variable_parameter) -> float:
    ...
s1 = "" # 
async def async_function():
    ...
class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3
class MyClass:
    def __init__(self):
        self.color = Color.RED
from typing import List, Tuple
import typing
# xxx line:comment.line.number-sign
# TODO | FIXME | HACK | NOTE | BUG | XXX: 2: keyword.codetag.notation
"""
TODO | FIXME | HACK | NOTE | BUG | XXX: ggg
"""
multi_str = """Line 1
Line 2
Line 3"""
type(None)  # 输出: <class 'NoneType'>
divide(s1) # line:meta.function-call 1:meta.function-call.generic 2:punctuation.definition.arguments.begin 3:meta.function-call.arguments 4:punctuation.definition.arguments.end

# 打印 Enum 和 auto 的类型
print(type(enum))  # 输出: <class 'module'>
print(type(Enum))  # 输出: <class 'enum.EnumType'>
print(type(auto))  # 输出: <class 'type'>
print(type(type))  # 输出: <class 'type'>
print(type(print))  # 输出: <class 'builtin_function_or_method'>
print(type(divide))  # 输出: <class 'function'>
print(type(""))  # 输出: <class 'str'>
print(type(s1))  # 输出: <class 'str'>
print(type(Color))  # 输出: <class 'enum.EnumType'>
print(type(Color.RED))  # 输出: <enum 'Color'>
print(type(MyClass))  # 输出: <class 'type'>
print(type(MyClass.__init__))  # 输出: <class 'function'>
print(type(None))  # 输出: <class 'NoneType'>
print(type(True))  # 输出: <class 'bool'>
print(type(3.14))  # 输出: <class 'float'>
print(type([]))  # 输出: <class 'list'>
print(type(List))  # 输出: <class 'typing._SpecialGenericAlias'>
print(type(typing))  # 输出: <class 'module'>
print(type(Tuple))  # 输出: <class 'typing._TupleType'>
print(type(()))  # 输出: <class 'tuple'>