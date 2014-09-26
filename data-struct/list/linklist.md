单链表
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
typedef int Status;

typedef struct LNode
{
    ElemType elem;
    struct LNode *next;
} LNode, *LinkList;

void initList (LinkList *list)
{
    *list = (LinkList)malloc(sizeof(LNode));
    if (!*list)
        exit(OVERFLOW);
    (*list)->next = NULL;
}

void destoryList (LinkList *list)
{
    LinkList q;
    while (*list)
    {
        q = (*list)->next;
        free(*list);
        *list = q;
    }
}

void clearList (LinkList list) {
    LinkList p, q;
    p = list->next;
    while (p)
    {
        q = p->next;
        free(p);
        p = q;
    }
    list->next = NULL;
}

Status listEmpty (LinkList list)
{
    return list->next == NULL;
}

int listLength (LinkList list)
{
    LinkList p;
    int i = 0;
    p = list->next;
    while (p)
    {
        i++;
        p = p->next;
    }
    return i;
}

Status getElem (LinkList list, int i, ElemType *e)
{
    LinkList p;
    int j = 1;
    p = list->next;
    while (p && j < i)
    {
        j++;
        p = p->next;
    }
    if (!p || j > i)
        return ERROR;
    *e = p->elem;
    return 1;
}

int locateElem (LinkList list, ElemType e)
{
    LinkList p;
    int i = 0;
    p = list->next;
    while (p) {
        i++;
        if (p->elem == e)
            return i;
        p = p->next;
    }
    return 0;
}

Status priorElem (LinkList list, ElemType cur_e, ElemType *pre_e)
{
    LinkList p, q;
    p = list->next;
    while (p->next)
    {
        q = p->next;
        if (q->elem == cur_e)
        {
            *pre_e = p->elem;
            return OK;
        }
        p = q;
    }
    return INFEASIBLE;
}

Status nextElem (LinkList list, ElemType cur_e, ElemType *next_e)
{
    LinkList p;
    p = list->next;
    while (p->next)
    {
        if (p->elem == cur_e)
        {
            *next_e = p->next->elem;
            return OK;
        }
        p = p->next;
    }
    return INFEASIBLE;
}

Status listInsert (LinkList list, int i, ElemType e)
{
    LinkList p, newnode;
    int j = 1;
    p = list;
    // 找到第i-1个节点
    while (p && j < i)
    {
        j++;
        p = p->next;
    }
    if (!p || j > i)
        return ERROR;
    newnode = (LinkList)malloc(sizeof(LNode));
    if (!newnode)
        exit(OVERFLOW);
    newnode->elem = e;
    newnode->next = p->next;
    p->next = newnode;
    return OK;
}

Status listDelete (LinkList list, int i, ElemType *e)
{
    LinkList p, q;
    int j = 1;
    p = list;
    while (p->next && j < i)
    {
        j++;
        p = p->next;
    }
    if (!p || j > i)
        return ERROR;
    q = p->next;
    *e = q->elem;
    p->next = q->next;
    free(q);
    return OK;
}

void listTraverse (LinkList list)
{
    LinkList p = list->next;
    while (p)
    {
        printf("%d\t", p->elem);
        p = p->next;
    }
    printf("\n");
}

int main (int argc, char *argv[])
{
    LinkList list;
    initList(&list);
    for (int i = 1; i <= 10; i++)
        listInsert(list, i, i);
    printf("list traverse:\n");
    listTraverse(list);
    int a = locateElem(list, 8);
    printf("locate elem:\n");
    printf("%d\n", a);
    ElemType get;
    getElem(list, 10, &get);
    printf("get elem:\n");
    printf("%d\n", get);
    priorElem(list, 8, &get);
    printf("prior elem:\n");
    printf("%d\n", get);
    nextElem(list, 8, &get);
    printf("next elem:\n");
    printf("%d\n", get);
    listDelete(list, 8, &get);
    printf("delete elem:\n");
    printf("%d\n", get);
    printf("list length:\n");
    printf("%d\n", listLength(list));
}
```