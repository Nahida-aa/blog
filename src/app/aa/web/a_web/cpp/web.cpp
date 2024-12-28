#include <iostream>
#include <string>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <csignal>
#include <windows.h>

#pragma comment(lib, "Ws2_32.lib")

struct ServerConfig {
    std::string host = "127.0.0.1";
    int port = 8080;
    bool auto_port_check = true; // 是否启用自动端口检查
};

class WebServer {
public:
    WebServer(const ServerConfig& config)
        : host_(config.host), port_(config.port), auto_port_check_(config.auto_port_check), listen_socket_(INVALID_SOCKET), running_(true) {}

    ~WebServer() {
        if (listen_socket_ != INVALID_SOCKET) {
            closesocket(listen_socket_);
        }
        WSACleanup();
    }

    bool initialize() {
        WSADATA wsaData;
        int iResult = WSAStartup(MAKEWORD(2, 2), &wsaData);
        if (iResult != 0) {
            std::cerr << "WSAStartup failed: " << iResult << std::endl;
            return false;
        }

        listen_socket_ = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
        if (listen_socket_ == INVALID_SOCKET) {
            std::cerr << "Error at socket(): " << WSAGetLastError() << std::endl;
            WSACleanup();
            return false;
        }

        struct sockaddr_in address;
        address.sin_family = AF_INET;
        inet_pton(AF_INET, host_.c_str(), &address.sin_addr);
        address.sin_port = htons(port_);

        int max_attempts = auto_port_check_ ? 10 : 1;
        for (int i = 0; i < max_attempts; ++i) {
            if (bind(listen_socket_, (struct sockaddr*)&address, sizeof(address)) == SOCKET_ERROR) {
                int error = WSAGetLastError();
                if (error == WSAEADDRINUSE && auto_port_check_) {
                    std::cout << "Port " << port_ << " is already in use. Trying next port." << std::endl;
                    port_++;
                    address.sin_port = htons(port_);
                } else {
                    std::cerr << "Bind failed with error: " << error << " (" << get_error_message(error) << ")" << std::endl;
                    closesocket(listen_socket_);
                    WSACleanup();
                    return false;
                }
            } else {
                break;
            }
        }

        if (listen(listen_socket_, SOMAXCONN) == SOCKET_ERROR) {
            std::cerr << "Listen failed with error: " << WSAGetLastError() << std::endl;
            closesocket(listen_socket_);
            WSACleanup();
            return false;
        }

        return true;
    }

    void run() {
        std::cout << "Server listening on http://" << host_ << ":" << port_ << std::endl;

        while (running_) {
            SOCKET client_socket = accept(listen_socket_, NULL, NULL);
            if (client_socket == INVALID_SOCKET) {
                if (running_) {
                    std::cerr << "accept failed: " << WSAGetLastError() << std::endl;
                }
                continue;
            }

            char recvbuf[1024];
            int recvbuflen = 1024;
            int iResult = recv(client_socket, recvbuf, recvbuflen, 0);
            if (iResult > 0) {
                std::string request(recvbuf, iResult);
                std::string response = handle_request(request);

                int iSendResult = send(client_socket, response.c_str(), response.length(), 0);
                if (iSendResult == SOCKET_ERROR) {
                    std::cerr << "send failed: " << WSAGetLastError() << std::endl;
                }
            } else if (iResult == 0) {
                std::cout << "Connection closing..." << std::endl;
            } else {
                std::cerr << "recv failed: " << WSAGetLastError() << std::endl;
            }

            closesocket(client_socket);
        }
    }

    void stop() {
        running_ = false;
        if (listen_socket_ != INVALID_SOCKET) {
            closesocket(listen_socket_);
            listen_socket_ = INVALID_SOCKET;
        }
    }

private:
    std::string handle_request(const std::string& request) {
        if (request.find("GET / HTTP/1.1") != std::string::npos) {
            return "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<html><body><h1>Hello, World!</h1></body></html>";
        } else if (request.find("GET /about HTTP/1.1") != std::string::npos) {
            return "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<html><body><h1>About Page</h1></body></html>";
        } else {
            return "HTTP/1.1 404 Not Found\r\nContent-Type: text/html\r\n\r\n<html><body><h1>404 Not Found</h1></body></html>";
        }
    }

    std::string get_error_message(int error_code) {
        LPWSTR msg;
        FormatMessageW(
            FORMAT_MESSAGE_ALLOCATE_BUFFER | FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS,
            NULL,
            error_code,
            MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT),
            (LPWSTR)&msg,
            0,
            NULL
        );
        std::wstring message(msg);
        LocalFree(msg);

        // Convert wide string to narrow string
        std::string result(message.begin(), message.end());
        return result;
    }

    std::string host_;
    int port_;
    bool auto_port_check_;
    SOCKET listen_socket_;
    volatile bool running_;
};

BOOL WINAPI ConsoleHandler(DWORD signal) {
    if (signal == CTRL_C_EVENT) {
        std::cout << "`Ctrl + C` : Shutting down server..." << std::endl;
        return TRUE;
    }
    return FALSE;
}

int main(int argc, char* argv[]) {
    ServerConfig config;

    if (argc > 1) {
        config.host = argv[1];
    }
    if (argc > 2) {
        config.port = std::stoi(argv[2]);
    }
    if (argc > 3) {
        config.auto_port_check = std::string(argv[3]) == "true";
    }

    if (!SetConsoleCtrlHandler(ConsoleHandler, TRUE)) {
        std::cerr << "Error: Could not set control handler" << std::endl;
        return 1;
    }

    WebServer server(config);
    if (!server.initialize()) {
        return 1;
    }

    server.run();

    return 0;
}