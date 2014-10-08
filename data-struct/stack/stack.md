Stack 栈的链表实现
========

```c
//
//  main.c
//  data-struct
//
//  Created by cookfront on 14-8-16.
//  Copyright (c) 2014年 cookfront. All rights reserved.
//

#include <stdio.h>
#include <stdlib.h>

#ifndef NULL
#define NULL 0
#endif // NUL

#define OVERFLOW -2
#define INFEASIBLE -1
#define OK 1
#define ERROR 0
#define TRUE 1
#define FALSE 0

typedef int ElemType;

struct Node
{
    ElemType elem;
    struct Node *next;
};

typedef struct Node *PtrToNode;
typedef PtrToNode Stack;

int isEmpty (Stack S)
{
    return S->next == NULL;
}

void pop (Stack S)
{
    PtrToNode firstCell;
    
    if (isEmpty(S))
        printf("Empty stack");
    else
    {
        firstCell = S->next;
        S->next = firstCell->next;
        free(firstCell);
    }
}

ElemType top (Stack S)
{
    if (!isEmpty(S))
        return S->next->elem;
    printf("empty stack");
    return 0;
}

void Push (Stack S, ElemType X)
{
    PtrToNode tmpCell;
    
    tmpCell = malloc((sizeof(struct Node)));
    if (tmpCell == NULL)
        exit(OVERFLOW);
    else
    {
        tmpCell->elem = X;
        tmpCell->next = S->next;
        S->next = tmpCell;
    }
}

void makeEmpty (Stack S)
{
    if (S == NULL)
        printf("Must use createStack first");
    else
        while (!isEmpty(S))
            pop(S);
}

Stack createStack (void)
{
    Stack S;
    
    S = malloc(sizeof(struct Node));
    if (S == NULL)
        exit(OVERFLOW);
    S->next = NULL;
    makeEmpty(S);
    return S;
}


int main (int argc, char *argv[])
{

}
```