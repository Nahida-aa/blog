#pragma once
#include <iostream>
#include <sstream>
#include <string>
#include <variant>
#include <map> // C++98， 基于红黑树实现，键值对是有序的，查找、插入和删除操作的时间复杂度为 O(log n)
#include <unordered_map> // C++11 基于哈希表实现，键值对是无序的，查找、插入和删除操作的平均时间复杂度为 O(1)
#include <vector>
#include <memory>
#include "json.hpp"
#include "print.h"
#include <any>
#include <type_traits>

// 通用的模板函数，将任意类型转换为字符串
template <typename T>
std::string to_string(const T& value) {
    std::ostringstream oss;
    oss << value;
    return oss.str();
}

// 特化版本，用于处理布尔类型
template <>
std::string to_string<bool>(const bool& value) {
    return value ? "true" : "false";
}

// 特化版本，用于处理字符类型
template <>
std::string to_string<char>(const char& value) {
    return std::string(1, value);
}

// 特化版本，用于处理 C 风格字符串
template <>
std::string to_string<const char*>(const char* const& value) {
    return std::string(value);
}

// 特化版本，用于处理 std::string
template <>
std::string to_string<std::string>(const std::string& value) {
    return value;
}

// 特化版本，用于处理 std::map
template <typename K, typename V>
std::string to_string(const std::map<K, V>& m) {
    std::ostringstream oss;
    oss << "{";
    for (auto it = m.begin(); it != m.end(); ++it) {
        if (it != m.begin()) {
            oss << ", ";
        }
        oss << to_string(it->first) << ": " << to_string(it->second);
    }
    oss << "}";
    return oss.str();
}

// 特化版本，用于处理 std::unordered_map
template <typename K, typename V>
std::string to_string(const std::unordered_map<K, V>& m) {
    std::ostringstream oss;
    oss << "{";
    for (auto it = m.begin(); it != m.end(); ++it) {
        if (it != m.begin()) {
            oss << ", ";
        }
        oss << to_string(it->first) << ": " << to_string(it->second);
    }
    oss << "}";
    return oss.str();
}

// 特化版本，用于处理 std::vector
template <typename T>
std::string to_string(const std::vector<T>& v) {
    std::ostringstream oss;
    oss << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        if (i > 0) {
            oss << ", ";
        }
        oss << to_string(v[i]);
    }
    oss << "]";
    return oss.str();
}

// 特化版本，用于处理 std::variant
template <typename... Types>
std::string to_string(const std::variant<Types...>& value) {
    return std::visit([](const auto& v) { return to_string(v); }, value);
}

// 特化版本，用于处理 std::any
std::string to_string(const std::any& value) {
    if (value.type() == typeid(int)) {
        return to_string(std::any_cast<int>(value));
    } else if (value.type() == typeid(double)) {
        return to_string(std::any_cast<double>(value));
    } else if (value.type() == typeid(bool)) {
        return to_string(std::any_cast<bool>(value));
    } else if (value.type() == typeid(char)) {
        return to_string(std::any_cast<char>(value));
    } else if (value.type() == typeid(const char*)) {
        return to_string(std::any_cast<const char*>(value));
    } else if (value.type() == typeid(std::string)) {
        return to_string(std::any_cast<std::string>(value));
    } else if (value.type() == typeid(std::nullptr_t)) {
        return "nullptr";
    } else {
        return "Unsupported type";
    }
}


// 特化版本，用于处理 JsonNum
template <>
std::string to_string<JsonNum>(const JsonNum& value) {
    return std::visit([](const auto& v) { return to_string(v); }, value.num_);
}


template <>
std::string to_string<JsonStr>(const JsonStr& value) {
    return std::visit([](const auto& v) { return to_string(v); }, value.str_);
}


template <>
std::string to_string<JsonArr>(const JsonArr& value) {
    return to_string(value.arr_);
}


template <>
std::string to_string<JsonVal>(const JsonVal& value){
    return std::visit([](const auto& v) { return to_string(v); }, value.val_);
}

template <>
std::string to_string<JsonObj>(const JsonObj& value) {
    return to_string(value.obj_);
}

int test_to_string() {
    int i = 42; double d = 3.14;
    bool b = true;
    char c = 'A';
    const char* s = "Hello, World!";
    std::string str = "C++";
    std::cout << "int: " << to_string(i) << std::endl;
    std::cout << "double: " << to_string(d) << std::endl;
    std::cout << "bool: " << to_string(b) << std::endl;
    std::cout << "char: " << to_string(c) << std::endl;
    std::cout << "const char*: " << to_string(s) << std::endl;
    std::cout << "std::string: " << to_string(str) << std::endl;

    using ApiFuncResult = std::variant<const char*, std::string, std::string_view, char>;
    ApiFuncResult result = "Hello, World!";
    ApiFuncResult a_c = 'a';
    std::cout << "ApiFuncResult: " << to_string(result) << to_string(a_c) << std::endl;

    std::map<int, std::string> my_map = {{1, "one"}, {2, "two"}, {3, "three"}};
    std::cout << "std::map: " << to_string(my_map) << std::endl;
    
    JsonNum j_n = 42, j_n_f = 3.6, j_n_u = -37.3;
    std::cout << "JsonNumber: " << to_string(j_n) << to_string(j_n_f) << to_string(j_n_u) << std::endl;
    // print(j_n);
    JsonStr j_s_c = 'a', j_s_ch = "hello", j_s_str = std::string("world"), j_s_sv = std::string_view("cpp");
    std::cout << "JsonStr: " << to_string(j_s_c)<<to_string(j_s_ch)<<to_string(j_s_str)<<to_string(j_s_sv) << std::endl;
    JsonVal j_v_null = nullptr;
    std::cout << "JsonVal: " << to_string(j_v_null) << std::endl;
    JsonVal j_v_s = j_s_c;
    std::cout << "JsonVal: " << to_string(j_v_s) << std::endl;
    JsonVal j_v_n_f = 3.14;
    std::cout << "JsonVal: " << to_string(j_v_n_f) << std::endl;

    // JsonVal j_v_obj = R"( {"name": "cpp", "type": "programming language"} )";
    // std::cout << "JsonVal: " << to_string(j_v_obj)<<" type: "<< j_v_obj.type() << std::endl;
    // JsonVal j_v_obj_cell = JsonVal(R"( {"name": "cpp", "type": "programming language"} )");
    // std::cout << "j_v_obj_cell: " << to_string(j_v_obj_cell)<<" type: "<< j_v_obj_cell.type() << std::endl;
    JsonVal j_v_arr = {1,2,3};
    std::cout << "JsonVal: " << to_string(j_v_arr) << std::endl;
    JsonArr j_arr = {1,2,3};
    std::cout << "JsonArr: " << to_string(j_arr) << std::endl;
    return 0;
}