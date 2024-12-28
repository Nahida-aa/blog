#pragma once
#include <variant>
#include <string>
#include <iostream>
#include <sstream>
#include <unordered_map>
#include <vector>
#include <string_view>
#include <optional>
#include <stdexcept>
// #include "to_string.hpp"

// class JsonParser;
class JsonVal;

class JsonNum {
public:
    std::variant<int, double> num_;
    JsonNum() = default;
    JsonNum(int num) : num_(num) {}
    JsonNum(double num) : num_(num) {}
};
class JsonStr {
public:
    std::variant<const char*, std::string, std::string_view, char> str_;
    JsonStr() = default;
    JsonStr(const char* str) : str_(str) {}
    JsonStr(std::string str) : str_(str) {}
    JsonStr(std::string_view str) : str_(str) {}
    JsonStr(char str) : str_(str) {}
};

class JsonArr {
public:
    std::vector<JsonVal> arr_;
    JsonArr() = default;
    JsonArr(std::vector<JsonVal> arr) : arr_(arr) {}
    JsonArr(std::initializer_list<JsonVal> arr) : arr_(arr) {}
};
class JsonObj {
public:
    std::unordered_map<std::string, JsonVal> obj_;
    JsonObj() = default;
    JsonObj(std::unordered_map<std::string, JsonVal> obj) : obj_(obj) {}
};

// JSON 解析器类
class JsonParser {
public:
    JsonParser(const std::string& input) : input_(input), pos_(0) {}

    JsonVal parse() {
        skip_whitespace();
        if (pos_ >= input_.size()) {
            throw std::runtime_error("Empty input");
        }
        return parse_value();
    }

private:
    std::string input_;
    size_t pos_;

    void skip_whitespace() {
        while (pos_ < input_.size() && isspace(input_[pos_])) {
            ++pos_;
        }
    }

    JsonVal parse_value() {
        skip_whitespace();
        if (pos_ >= input_.size()) {
            throw std::runtime_error("Unexpected end of input");
        }
        char ch = input_[pos_];
        if (ch == 'n') {
            return parse_null();
        } else if (ch == 't' || ch == 'f') {
            return parse_bool();
        } else if (ch == '"') {
            return parse_string();
        } else if (ch == '{') {
            return parse_object();
        } else if (ch == '[') {
            return parse_array();
        } else if (isdigit(ch) || ch == '-') {
            return parse_number();
        } else {
            throw std::runtime_error("Unexpected character");
        }
    }

    JsonVal parse_null() {
        if (input_.substr(pos_, 4) == "null") {
            pos_ += 4;
            return JsonVal(nullptr);
        }
        throw std::runtime_error("Invalid null value");
    }

    JsonVal parse_bool() {
        if (input_.substr(pos_, 4) == "true") {
            pos_ += 4;
            return JsonVal(true);
        } else if (input_.substr(pos_, 5) == "false") {
            pos_ += 5;
            return JsonVal(false);
        }
        throw std::runtime_error("Invalid boolean value");
    }

    JsonVal parse_string() {
        ++pos_; // skip opening quote
        std::string result;
        while (pos_ < input_.size() && input_[pos_] != '"') {
            if (input_[pos_] == '\\') {
                ++pos_;
                if (pos_ < input_.size()) {
                    char escaped = input_[pos_];
                    switch (escaped) {
                        case '"': result += '"'; break;
                        case '\\': result += '\\'; break;
                        case '/': result += '/'; break;
                        case 'b': result += '\b'; break;
                        case 'f': result += '\f'; break;
                        case 'n': result += '\n'; break;
                        case 'r': result += '\r'; break;
                        case 't': result += '\t'; break;
                        default: throw std::runtime_error("Invalid escape sequence");
                    }
                }
            } else {
                result += input_[pos_];
            }
            ++pos_;
        }
        if (pos_ >= input_.size() || input_[pos_] != '"') {
            throw std::runtime_error("Unterminated string");
        }
        ++pos_; // skip closing quote
        return JsonVal(result);
    }

    JsonVal parse_number() {
        size_t start_pos = pos_;
        if (input_[pos_] == '-') {
            ++pos_;
        }
        while (pos_ < input_.size() && isdigit(input_[pos_])) {
            ++pos_;
        }
        if (pos_ < input_.size() && input_[pos_] == '.') {
            ++pos_;
            while (pos_ < input_.size() && isdigit(input_[pos_])) {
                ++pos_;
            }
            return JsonVal(std::stod(input_.substr(start_pos, pos_ - start_pos)));
        }
        return JsonVal(std::stoi(input_.substr(start_pos, pos_ - start_pos)));
    }

    JsonVal parse_array() {
        ++pos_; // skip opening bracket
        std::vector<JsonVal> arr;
        while (true) {
            skip_whitespace();
            if (pos_ >= input_.size()) {
                throw std::runtime_error("Unterminated array");
            }
            if (input_[pos_] == ']') {
                ++pos_; // skip closing bracket
                break;
            }
            arr.push_back(parse_value());
            skip_whitespace();
            if (pos_ < input_.size() && input_[pos_] == ',') {
                ++pos_; // skip comma
            }
        }
        return JsonVal(arr);
    }

    JsonVal parse_object() {
        ++pos_; // skip opening brace
        std::unordered_map<std::string, JsonVal> obj;
        while (true) {
            skip_whitespace();
            if (pos_ >= input_.size()) {
                throw std::runtime_error("Unterminated object");
            }
            if (input_[pos_] == '}') {
                ++pos_; // skip closing brace
                break;
            }
            if (input_[pos_] != '"') {
                throw std::runtime_error("Expected string key");
            }
            std::string key = std::get<std::string>(std::get<JsonStr>(parse_string().val_).str_);
            skip_whitespace();
            if (pos_ >= input_.size() || input_[pos_] != ':') {
                throw std::runtime_error("Expected colon");
            }
            ++pos_; // skip colon
            obj[key] = parse_value();
            skip_whitespace();
            if (pos_ < input_.size() && input_[pos_] == ',') {
                ++pos_; // skip comma
            }
        }
        return JsonVal(obj);
    }
};
class JsonVal {
public:
    // std::variant<JsonNum, JsonStr, std::nullptr_t, bool, JsonArr, JsonObj> val_;
    std::variant<JsonNum, JsonStr, std::nullptr_t, bool, std::vector<JsonVal>, std::unordered_map<std::string, JsonVal>> val_;
    JsonVal() = default;
    JsonVal(std::nullptr_t null) : val_(null) {}
    JsonVal(bool b) : val_(b) {}
    JsonVal(JsonNum num) : val_(num) {}
    JsonVal(int num) : val_(JsonNum(num)) {}
    JsonVal(double num) : val_(JsonNum(num)) {}

    JsonVal(JsonStr str) : val_(str) {}
    JsonVal(const char* str) : val_(JsonStr(str)) {}
    JsonVal(std::string str) {
        if (is_json(str)) {
            *this = JsonParser(str).parse();
        } else {
            val_ = JsonStr(str);
        }
    }
    JsonVal(std::string_view str) : val_(JsonStr(str)) {}
    JsonVal(char str) : val_(JsonStr(str)) {}

    JsonVal(std::vector<JsonVal> arr) : val_(arr) {}
    JsonVal(std::initializer_list<JsonVal> list) : val_(std::vector<JsonVal>(list)) {}

    JsonVal(std::unordered_map<std::string, JsonVal> obj) : val_(obj) {}

    std::string type() const {
        switch (val_.index()) {
            case 0: return "JsonNum";
            case 1: return "JsonStr";
            case 2: return "nullptr";
            case 3: return "bool";
            case 4: return "JsonArr";
            case 5: return "JsonObj";
            default: return "unknown";
        }
    }
private:
    static bool is_json(const std::string& str) {
        std::istringstream iss(str);
        char ch;
        iss >> ch;
        return ch == '{' || ch == '[';
    }
};
int test_json(){
    // std::unordered_map<std::string, JsonVal> api() {
    //     return {
    //         {"name", "John"},
    //         {"age", 30},
    //         {"is_student", false},
    //         {"scores", {100, 90, 95.5}},
    //         {"address", {
    //             {"city", "New York"},
    //             {"zip", "10001"}
    //         }}
    //     };
    // }
    // JsonObj json_from_str = JsonObj(R"(
    //     {
    //         "name": "John",
    //         "age": 30,
    //         "is_student": false,
    //         "scores": [100, 90, 95.5],
    //         "address": {
    //             "city": "New York",
    //             "zip": "10001"
    //         }
    //     }
    // )");
    // std::cout << "JSON: " << json_from_str.to_string() << std::endl;
    // Json json_from_map = Json{
    //     {"name", "John"},
    //     {"age", 30},
    //     {"is_student", false},
    //     {"scores", {100, 90, 95.5}},
    //     {"address", {
    //         {"city", "New York"},
    //         {"zip", "10001"}
    //     }}
    // };


    return 0;
}
