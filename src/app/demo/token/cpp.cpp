// src/app/example.cpp

#include <iostream>

int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(2, 3);
    std::cout << result << std::endl;
    return 0;
}

// C++ 自定义字面量操作符
long double operator"" _km(long double val) { // entity.name.operator.custom-literal
    return val * 1000;
}

auto distance = 3.5_km; // 使用自定义字面量操作符