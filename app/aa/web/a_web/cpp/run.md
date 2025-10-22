```sh
g++ -std=c++20 -Iinclude -O2 main.cpp -o main -lws2_32 -lpthread && main
g++ -std=c++20 -Iinclude -Ianother_include -O2 main.cpp -o main -lws2_32 -lpthread && main
```
