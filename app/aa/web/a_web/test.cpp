#include <iostream>
#include <string>

#ifdef _WIN32
#include <winsock2.h>
#include <ws2tcpip.h>
#pragma comment(lib, "Ws2_32.lib")

void handle_client(SOCKET client_socket) {
    const std::string response =
        "HTTP/1.1 200 OK\r\n"
        "Content-Type: text/plain\r\n"
        "Content-Length: 13\r\n"
        "\r\n"
        "Hello, World!";

    send(client_socket, response.c_str(), response.size(), 0);
    closesocket(client_socket);
}

std::string get_last_error_message() {
    DWORD errorMessageID = ::WSAGetLastError();
    if (errorMessageID == 0) {
        return std::string(); // No error message has been recorded
    }

    LPSTR messageBuffer = nullptr;
    size_t size = FormatMessageA(
        FORMAT_MESSAGE_ALLOCATE_BUFFER | FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS,
        NULL, errorMessageID, MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT), (LPSTR)&messageBuffer, 0, NULL);

    std::string message(messageBuffer, size);
    LocalFree(messageBuffer);
    return message;
}

int main() {
    WSADATA wsaData;
    int result = WSAStartup(MAKEWORD(2, 2), &wsaData);
    if (result != 0) {
        std::cerr << "WSAStartup failed: " << result << std::endl;
        return 1;
    }

    SOCKET server_socket;
    sockaddr_in server_addr;
    int port = 8000;

    while (true) {
        server_socket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
        if (server_socket == INVALID_SOCKET) {
            std::cerr << "Failed to create socket: " << get_last_error_message() << std::endl;
            WSACleanup();
            return 1;
        }

        server_addr.sin_family = AF_INET;
        server_addr.sin_addr.s_addr = INADDR_ANY;
        server_addr.sin_port = htons(port);

        if (bind(server_socket, (sockaddr*)&server_addr, sizeof(server_addr)) == SOCKET_ERROR) {
            std::cerr << "Failed to bind socket on port " << port << ": " << get_last_error_message() << std::endl;
            closesocket(server_socket);
            port++;
            continue;
        }

        if (listen(server_socket, SOMAXCONN) == SOCKET_ERROR) {
            std::cerr << "Failed to listen on socket: " << get_last_error_message() << std::endl;
            closesocket(server_socket);
            WSACleanup();
            return 1;
        }

        std::cout << "Serving on http://localhost:" << port << "..." << std::endl;
        break;
    }

    while (true) {
        SOCKET client_socket = accept(server_socket, nullptr, nullptr);
        if (client_socket == INVALID_SOCKET) {
            std::cerr << "Failed to accept client: " << get_last_error_message() << std::endl;
            continue;
        }

        handle_client(client_socket);
    }

    closesocket(server_socket);
    WSACleanup();
    return 0;
}

#else
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <cstring>
#include <cerrno>

void handle_client(int client_socket) {
    const std::string response =
        "HTTP/1.1 200 OK\r\n"
        "Content-Type: text/plain\r\n"
        "Content-Length: 13\r\n"
        "\r\n"
        "Hello, World!";

    send(client_socket, response.c_str(), response.size(), 0);
    close(client_socket);
}

int main() {
    int server_socket;
    sockaddr_in server_addr;
    int port = 8000;

    while (true) {
        server_socket = socket(AF_INET, SOCK_STREAM, 0);
        if (server_socket == -1) {
            std::cerr << "Failed to create socket: " << strerror(errno) << std::endl;
            return 1;
        }

        server_addr.sin_family = AF_INET;
        server_addr.sin_addr.s_addr = INADDR_ANY;
        server_addr.sin_port = htons(port);

        if (bind(server_socket, (struct sockaddr*)&server_addr, sizeof(server_addr)) == -1) {
            std::cerr << "Failed to bind socket on port " << port << ": " << strerror(errno) << std::endl;
            close(server_socket);
            port++;
            continue;
        }

        if (listen(server_socket, 10) == -1) {
            std::cerr << "Failed to listen on socket: " << strerror(errno) << std::endl;
            close(server_socket);
            return 1;
        }

        std::cout << "Serving on http://localhost:" << port << "..." << std::endl;
        break;
    }

    while (true) {
        int client_socket = accept(server_socket, nullptr, nullptr);
        if (client_socket == -1) {
            std::cerr << "Failed to accept client: " << strerror(errno) << std::endl;
            continue;
        }

        handle_client(client_socket);
    }

    close(server_socket);
    return 0;
}
#endif