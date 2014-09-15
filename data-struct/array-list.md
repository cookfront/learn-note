线性表的顺序存储结构
========

`list.h`

```c
#ifndef LIST_H_INCLUDED
#define LIST_H_INCLUDED

#ifndef NULL
#define NULL 0
#endif // NUL

#define LIST_INIT_SIZE 10   /* 线性存储空间的初始分配量 */
#define LISTINCREMENT  10   /* 线性存储空间的分配增量 */

#define OK 1
#define ERROR 0
#define TRUE 1
#define FALSE 0
#define OVERFLOW -1

typedef int ElementType;
typedef int Status;

typedef struct
{
    ElementType *elem;
    int length;
    int size;
} ArrayList;

void initList (ArrayList *list);
void destoryList (ArrayList *list);
void clearList (ArrayList *list);
Status isEmpty (ArrayList list);
int listLength (ArrayList list);
Status getElem (ArrayList list, int i, ElementType *e);
int locateElem (ArrayList list, ElementType e);
Status priorElem (ArrayList list, ElementType cur_e, ElementType *pre_e);
Status nextElem (ArrayList list, ElementType cur_e, ElementType *next_e);
Status listInsert (ArrayList *list, int i, ElementType e);
Status listDelete (ArrayList *list, int i, ElementType *e);
void listTraverse(ArrayList list, void(*vi)(ElementType *));


#endif // LIST_H_INCLUDED

```

`list.c`

```c
#include <stdio.h>
#include <stdlib.h>
#include "list.h"

void initList (ArrayList *list)
{
    printf("some");
    list->elem = (ElementType *)malloc(LIST_INIT_SIZE * sizeof(ElementType));
    if (!list->elem)
        exit(OVERFLOW);
    list->length = 0;
    list->size = LIST_INIT_SIZE;
}

void destoryList (ArrayList *list)
{
    free(list->elem);
    list->elem = NULL;
    list->length = 0;
    list->size = 0;
}

void clearList (ArrayList *list)
{
    list->length = 0;
}

Status isEmpty (ArrayList list)
{
    if (list.length == 0)
        return TRUE;
    return FALSE;
}

int listLength (ArrayList list)
{
    return list.length;
}

Status getElem (ArrayList list, int i, ElementType *e)
{
    if (i < 0 || i > list.length - 1)
        return ERROR;
    *e = *(list.elem + i - 1);
    return OK;
}

int locateElem(ArrayList list, ElementType e)
{
    int i = 0;
    ElementType *p = list.elem;
    while (i < list.length && *p++ != e)
        ++i;
    if (i < list.length)
        return i;
    else
        return -1;
}

Status priorElem(ArrayList list, ElementType cur_e, ElementType *pre_e)
{
    int i = 1;
    ElementType *p = list.elem + 1;
    while (i < list.length && cur_e != *p)
    {
        i++;
        p++;
    }
    if (i >= list.length)
        return ERROR;
    else
    {
        *pre_e = *--p;
        return OK;
    }
}

Status nextElem(ArrayList list, ElementType cur_e, ElementType *next_e)
{
    int i = 0;
    ElementType *p = list.elem;
    while (i < list.length - 1 && cur_e != *p)
    {
        i++;
        p++;
    }
    if (i >= list.length - 1)
        return ERROR;
    else
    {
        *next_e = *++p;
        return OK;
    }
}

Status listInsert (ArrayList *list, int i, ElementType e)
{
    ElementType *newbase, *q, *p;
    if (i < 0 || i > list->length - 1)
        return ERROR;

    if (list->length == list->size)
    {
        newbase = (ElementType *)realloc(list->elem, (list->size + LISTINCREMENT) * sizeof(ElementType));
        if (newbase == NULL)
            exit(-1);
        list->elem = newbase;
        list->size += LISTINCREMENT;
    }
    q = list->elem + i - 1;
    for (p = list->elem + list->length - 1; p >= q; --p)
        *(p + 1) = *p;
    *q = e;
    ++list->length;
    return OK;
}

Status listDelete(ArrayList *list, int i, ElementType *e)
{
    ElementType *p;
    if (i < 0 || i > list->length - 1)
        return ERROR;

    p = list->elem + i - 1;
    *e = *p;
    for (++p; p < list->elem + list->length; p++)
        *(p - 1) = *p;
    --list->length;
    return OK;
}

void listTraverse(ArrayList list, void(*vi)(ElementType *))
{
    ElementType *p;
    int i;
    p = list.elem;
    for (i = 0; i < list.length; i++)
        vi(p++);
    printf("\n");
}


```

`main.c`

```c

```