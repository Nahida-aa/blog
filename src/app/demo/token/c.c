// src/app/example.c

#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(2, 3);
    printf("%d\n", result);
    return 0;
}