#include <iostream>
#include <string>
#include <sstream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <csignal>
#include <windows.h>

#pragma comment(lib, "Ws2_32.lib")

const int DEFAULT_PORT = 8080;
const int MAX_PORT_ATTEMPTS = 10;
SOCKET ListenSocket = INVALID_SOCKET;
volatile bool running = true;

std::string handle_request(const std::string& request) {
    if (request.find("GET / HTTP/1.1") != std::string::npos) {
        return "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<html><body><h1>Hello, World!</h1></body></html>";
    } else if (request.find("GET /about HTTP/1.1") != std::string::npos) {
        return "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<html><body><h1>About Page</h1></body></html>";
    } else {
        return "HTTP/1.1 404 Not Found\r\nContent-Type: text/html\r\n\r\n<html><body><h1>404 Not Found</h1></body></html>";
    }
}

bool bind_to_port(SOCKET& ListenSocket, int port) {
    struct sockaddr_in address;
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(port);

    if (bind(ListenSocket, (struct sockaddr *)&address, sizeof(address)) == SOCKET_ERROR) {
        int error = WSAGetLastError();
        if (error == WSAEADDRINUSE) {
            std::cout << "Port " << port << " is already in use. Trying next port." << std::endl;
            return false;
        } else {
            std::cerr << "Bind failed with error: " << error << std::endl;
            return false;
        }
    }
    return true;
}

BOOL WINAPI ConsoleHandler(DWORD signal) {
    if (signal == CTRL_C_EVENT) {
        std::cout << "`Ctrl + C` : Shutting down server..." << std::endl;
        running = false;
        if (ListenSocket != INVALID_SOCKET) {
            closesocket(ListenSocket);
            WSACleanup();
        }
        return TRUE;
    }
    return FALSE;
}

int main() {
    // 注册控制台处理程序
    if (!SetConsoleCtrlHandler(ConsoleHandler, TRUE)) {
        std::cerr << "Error: Could not set control handler" << std::endl;
        return 1;
    }

    // 初始化Winsock
    WSADATA wsaData;
    int iResult = WSAStartup(MAKEWORD(2,2), &wsaData);
    if (iResult != 0) {
        std::cerr << "WSAStartup failed: " << iResult << std::endl;
        return 1;
    }

    SOCKET ClientSocket = INVALID_SOCKET;

    ListenSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (ListenSocket == INVALID_SOCKET) {
        std::cerr << "Error at socket(): " << WSAGetLastError() << std::endl;
        WSACleanup();
        return 1;
    }

    int port = DEFAULT_PORT;
    bool bound = false;
    for (int i = 0; i < MAX_PORT_ATTEMPTS; i++) {
        if (bind_to_port(ListenSocket, port)) {
            bound = true;
            break;
        }
        port++;
    }

    if (!bound) {
        std::cerr << "Failed to bind to any port after " << MAX_PORT_ATTEMPTS << " attempts." << std::endl;
        closesocket(ListenSocket);
        WSACleanup();
        return 1;
    }

    if (listen(ListenSocket, SOMAXCONN) == SOCKET_ERROR) {
        std::cerr << "Listen failed with error: " << WSAGetLastError() << std::endl;
        closesocket(ListenSocket);
        WSACleanup();
        return 1;
    }

    std::cout << "Server listening on http://localhost:" << port << std::endl;

    while(running) {
        // 接受客户端连接
        ClientSocket = accept(ListenSocket, NULL, NULL);
        if (ClientSocket == INVALID_SOCKET) {
            if (running) {
                std::cerr << "accept failed: " << WSAGetLastError() << std::endl;
            }
            continue;
        }

        char recvbuf[1024];
        int recvbuflen = 1024;
        int iSendResult;

        // 接收数据
        iResult = recv(ClientSocket, recvbuf, recvbuflen, 0);
        if (iResult > 0) {
            std::string request(recvbuf, iResult);
            std::string response = handle_request(request);

            // 发送响应
            iSendResult = send(ClientSocket, response.c_str(), response.length(), 0);
            if (iSendResult == SOCKET_ERROR) {
                std::cerr << "send failed: " << WSAGetLastError() << std::endl;
            }
        }
        else if (iResult == 0) {
            std::cout << "Connection closing..." << std::endl;
        }
        else {
            std::cerr << "recv failed: " << WSAGetLastError() << std::endl;
        }

        // 关闭客户端socket
        closesocket(ClientSocket);
    }

    // 清理
    closesocket(ListenSocket);
    WSACleanup();

    return 0;
}