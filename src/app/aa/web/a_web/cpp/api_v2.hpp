#pragma once
#include <iostream>
#include <string>
#include <vector>
#include <functional>
#include <regex>
#include "request.hpp"
#include "response.hpp"
#include <variant> // c++17
#include "to_str.hpp"

using namespace std;

// Route handler function type, 定义路由处理函数类型
using ApiFuncResult = variant<const char*, string, string_view>;
using RouteHandler = function<Response(const Request&, const vector<string>&)>;

// Route structure
struct Route {
    string method;
    string path;
    vector<string> param_names;
    RouteHandler handler;
    // 使用 {} 初始化列表 时, 不能将 lambda 表达式作为参数传递给 vector::push_back, 需要显式地构造 Route 对象
    Route(const string& method, const string& path, const vector<string>& param_names, RouteHandler handler)
        : method(method), path(path), param_names(param_names), handler(handler) {}
};

// Api class (replacing WebApi)
class Api {
public:
    template<typename Func>
    void addRoute(const string& method, const string& path, const vector<string>& param_names, Func api_func) {
        routes.emplace_back(method, path, param_names, 
            [api_func](const Request& req, const vector<string>& params) -> Response {
                return call_with_params(api_func, req, params);
            }
        );
    }

    template<typename Func>
    void get(const string& path, Func api_func) {
        addRoute("GET", path, {}, api_func);
    }
    template<typename Func>
    void get(const string& path, const vector<string>& param_names, Func api_func) {
        addRoute("GET", path, param_names, api_func);
    }

    template<typename Func>
    void post(const string& path, Func api_func) {
        addRoute("POST", path, {}, api_func);
    }
    template<typename Func>
    void post(const string& path, const vector<string>& param_names, Func api_func) {
        addRoute("POST", path, param_names, api_func);
    }

    template<typename Func>
    void put(const string& path, Func api_func) {
        addRoute("PUT", path, {}, api_func);
    }
    template<typename Func>
    void put(const string& path, const vector<string>& param_names, Func api_func) {
        addRoute("PUT", path, param_names, api_func);
    }

    template<typename Func>
    void del(const string& path, Func api_func) {
        addRoute("DELETE", path, {}, api_func);
    }
    template<typename Func>
    void del(const string& path, const vector<string>& param_names, Func api_func) {
        addRoute("DELETE", path, param_names, api_func);
    }

    Response handle_request(const string& request_str) { // web_server 会调用这个方法来 接收 请求字符串，得到响应字符串
        Request request(request_str);
        cout << "Api::handle_request: Method: " << request.method << ", Path: " << request.path << endl;
        for (const auto& route : routes) {
            if (route.method == request.method) {
                regex route_regex(route.path);
                smatch matches;
                if (regex_match(request.path, matches, route_regex)) {
                    vector<string> param_values;
                    for (size_t i = 1; i < matches.size(); ++i) {
                        param_values.push_back(matches[i].str());
                    }
                    request.set_path_params(route.param_names, param_values);
                    cout << "Api::handle_request: 准备调用处理函数: 准备获得响应体" << endl; // 调用处理函数
                    try {
                        Response response = route.handler(request, param_values);
                        cout << "Api::handle_request: 调用处理函数: 成功获得响应体: " << response.body << endl; // 调用处理函数
                        return response;
                    } catch (const runtime_error& e) {
                        return Response(409, Json().set("error", e.what()).dumps()); // 409 Conflict
                    } catch (const exception& e) {
                        return Response(500, Json().set("error", e.what()).dumps());
                    }
                }
            }
        }

        return Response(404, "<div>404</div>");
    }

    void print_routes() const {
        cout << "Registered[注册的] Routes:" << endl;
        for (const auto& route : routes) {
            cout << route.method << " " << route.path << endl;
        }
    }

private:
    vector<Route> routes;

    template<typename Func, typename... Args, size_t... I>
    static auto call_with_params_impl(Func&& func, const Request& req, const vector<string>& params, index_sequence<I...>) {
        return func(req, params[I]...);
    }

    template<typename Func>
    static auto call_with_params(Func&& func, const Request& req, const vector<string>& params) {
        constexpr auto arity = tuple_size<typename function_traits<Func>::args_type>::value;
        return call_with_params_impl(std::forward<Func>(func), req, params, make_index_sequence<arity - 1>{});
    }

    template<typename T>
    struct function_traits;

    template<typename R, typename... Args>
    struct function_traits<R(Args...)> {
        using args_type = tuple<Args...>;
    };

    template<typename R, typename... Args>
    struct function_traits<R(*)(Args...)> : function_traits<R(Args...)> {};

    template<typename R, typename C, typename... Args>
    struct function_traits<R(C::*)(Args...)> : function_traits<R(Args...)> {};

    template<typename R, typename C, typename... Args>
    struct function_traits<R(C::*)(Args...) const> : function_traits<R(Args...)> {};

    template<typename R, typename C, typename... Args>
    struct function_traits<R(C::*)(Args...) volatile> : function_traits<R(Args...)> {};

    template<typename R, typename C, typename... Args>
    struct function_traits<R(C::*)(Args...) const volatile> : function_traits<R(Args...)> {};

    template<typename F>
    struct function_traits : function_traits<decltype(&F::operator())> {};
};