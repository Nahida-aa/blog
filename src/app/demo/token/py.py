async def my_function(): # line:meta.function 1:storage.type.function 2:entity.name.function, meta.function 3: meta.function.parameters, punctuation.definition.parameters.begin 4: meta.function.parameters, punctuation.definition.parameters.end
    print("Hello, World!") # meta.function-call print:support.function.builtin "Hello, World!":meta.function-call.arguments,string.quoted.single

    result = abs(-5)
    return result
my_function()
type(print) # meta.function-call print: meta.function-call.arguments,	support.function.builtin
type(my_function) # meta.function-call my_function:	meta.function-call.arguments
printf = print
class MyClass: # meta.class entity.name.class
    def __init__(self, name): # meta.function entity.name.function
        self.name = name
    def greet(self): # meta.function entity.name.function
        print(f"Hello, {self.name, True}\n zz!") # meta.function-call print:support.function.builtin "Hello, {self.name}!":meta.function-call.arguments,string.quoted.double
        return f"Hello, {self.name}!"
    def __str__(self): # meta.function entity.name.function
        return f"MyClass({self.name})"
    @classmethod
    def class_method(cls):
        print(cls.class_variable)  # cls 用于类变量

    def instance_method(self):
        print(self.instance_variable)  # self 用于实例变量
# 创建实例
type_obj = type(MyClass)
obj = MyClass("instance variable")
obj.instance_method()
MyClass.class_method()
    
"""
TODO | FIXME | HACK | NOTE | BUG | XXX: xxxf
"""
s1 = """
TODO | FIXME | HACK | NOTE | BUG | XXX:
"""
# 导入模块
import math
from typing import List, Tuple
import os
# 导入  模块中的  类
from os import path as os_path
# 导入模块中的函数
from math import sqrt as square_root

# 全局变量(常量) 社区规范：全局变量名大写，单词之间用下划线分隔
GLOBAL_VAR = 42 # 1:variable.other.constant

# Enum, auto 都是 type 的实例
from enum import Enum, auto # 4:entity.name.type.enum 6:entity.name.type.class

# 定义枚举类,  Python 社区规范中，枚举（Enum）中的元素通常被视为常量。枚举成员的名称通常使用全大写字母，以表示它们是常量。这是一种命名约定，旨在提高代码的可读性和可维护性。
class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3
# 使用自动值
class Status(Enum):
    PENDING = auto()
    RUNNING = auto()
    COMPLETED = auto()
# 访问枚举成员
print(Color.RED)        # 输出: Color.RED
print(Color.RED.name)   # 输出: RED
print(Color.RED.value)  # 输出: 1

# 枚举成员的比较
if Color.RED == Color.RED:
    print("Colors are equal")

# 遍历枚举成员
for color in Color:
    print(color)

# 使用自动值的枚举
print(Status.PENDING)        # 输出: Status.PENDING
print(Status.PENDING.name)   # 输出: PENDING
print(Status.PENDING.value)  # 输出: 1
# 自定义装饰器
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Something is happening before the function is called.")
        result = func(*args, **kwargs)
        print("Something is happening after the function is called.")
        return result
    return wrapper

# 自定义函数
@my_decorator
def custom_function(name: str, age: int) -> str:
    """
    这是一个自定义函数，带有类型注解和文档字符串。
    """
    print(f"Name: {name}, Age: {age}")
    return f"Hello, {name}! You are {age} years old."

# 类定义
class Animal:
    def __init__(self, name: str):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclasses must implement this method")

# 继承
class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# 异常处理
def divide(a: float, b: float) -> float:
    try:
        result = a / b
    except ZeroDivisionError as e:
        print("Error: Cannot divide by zero!")
        raise e
    else:
        return result
    finally:
        print("Execution completed.")

# 列表推导式
squares = [x**2 for x in range(10)]

# 生成器
def fibonacci(n: int):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# 上下文管理器
class MyContextManager:
    def __enter__(self):
        print("Entering the context")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting the context")

# 使用内置函数
abs_value = abs(-5)
sqrt_value = math.sqrt(16)
env_path = os.getenv('PATH')

# 主函数
def main():
    print("This is the main function.")
    print(custom_function("Alice", 30))

    dog = Dog("Buddy")
    cat = Cat("Whiskers")
    print(dog.speak())
    print(cat.speak())

    try:
        print(divide(10, 2))
        print(divide(10, 0))
    except ZeroDivisionError:
        print("Caught a division by zero error.")

    print(squares)
    print(list(fibonacci(10)))

    with MyContextManager():
        print("Inside the context")

if __name__ == "__main__":
    main()