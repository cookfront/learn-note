线性表的顺序存储结构
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

#define LIST_INIT_SIZE 10   /* 线性存储空间的初始分配量 */
#define LISTINCREMENT  10   /* 线性存储空间的分配增量 */

typedef int ElementType;
typedef int Status;

typedef struct
{
    int size;
    int length;
    ElementType *elem;
} SqList;

void initList (SqList *list)
{
    list->elem = (ElementType*)malloc(LIST_INIT_SIZE * sizeof(ElementType));
    if (!list->elem)
        exit(-2);
    list->length = 0;
    list->size = LIST_INIT_SIZE;
}

void destoryList (SqList *list)
{
    free(list->elem);
    list->elem = NULL;
    list->length = 0;
    list->size = 0;
}

void clearList (SqList *list)
{
    list->length = 0;
}

Status isEmpty (SqList list)
{
    return list.length == 0;
}

int listLength (SqList list)
{
    return list.length;
}

Status getElem (SqList list, int i, ElementType *e)
{
    if (i < 0 || i > list.length)
        return 0;
    *e = *(list.elem + i - 1);
    return 1;
}

int locateElem (SqList list, ElementType e)
{
    int i = 1;
    ElementType *p = list.elem;
    while (i < list.length && *p++ != e)
        i++;
    return i;
}

Status priorElem (SqList list, ElementType cur_e, ElementType *pre_e)
{
    int i = locateElem(list, cur_e);
    if (i > list.length)
        return 0;
    *pre_e = *(list.elem + i - 2);
    return 1;
}

Status nextElem (SqList list, ElementType cur_e, ElementType *next_e)
{
    int i = locateElem(list, cur_e);
    if (i == list.length - 1)
        return 0;
    *next_e = *(list.elem + i);
    return 1;
}

Status listInsert (SqList *list, int i, ElementType e)
{
    ElementType *newbase, *q, *p;
    if (i < 0 || i > list->length + 1)
        return 0;
    if (list->length == list->size)
    {
        newbase = (ElementType *)realloc(list->elem, (list->size + LISTINCREMENT) * sizeof(ElementType));
        if (!newbase)
            exit(-1);
        list->elem = newbase;
        list->size += LISTINCREMENT;
    }
    q = list->elem + i - 1;
    for (p = list->elem + list->length - 1; p >= q; p--)
        *(p + 1) = *p;
    *q = e;
    ++list->length;
    return 1;
}

Status listDelete (SqList *list, int i, ElementType *e)
{
    ElementType *p;
    if (i < 0 || i > list->length)
        return 0;
    p = list->elem + i - 1;
    *e = *(list->elem + i - 1);
    for (++p; p < list->elem + list->length - 1; p++)
        *(p - 1) = *p;
    --list->length;
    return 1;
}

void listTraverse(SqList list)
{
    ElementType *p;
    int i;
    p = list.elem;
    for (i = 0; i < list.length; i++)
        printf("%d\t", *(p++));
    printf("\n");
}

int main (int argc, char *argv[])
{
    SqList list;
    initList(&list);
    for (int i = 1; i <= 10; i++)
        listInsert(&list, i, i);
    printf("list traverse:\n");
    listTraverse(list);
    int a = locateElem(list, 8);
    printf("locate elem:\n");
    printf("%d\n", a);
    ElementType get;
    getElem(list, 10, &get);
    printf("get elem:\n");
    printf("%d\n", get);
    priorElem(list, 8, &get);
    printf("prior elem:\n");
    printf("%d\n", get);
    nextElem(list, 8, &get);
    printf("next elem:\n");
    printf("%d\n", get);
    listDelete(&list, 8, &get);
    printf("delete elem:\n");
    printf("%d\n", get);
    printf("list length:\n");
    printf("%d\n", list.length);
}

```