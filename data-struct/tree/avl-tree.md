AVL Tree
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

struct AvlNode;
typedef struct AvlNode *Position;
typedef struct AvlNode *AvlTree;

struct AvlNode
{
    ElemType elem;
    AvlTree left;
    AvlTree right;
    int height;
};

AvlTree MakeEmpty (AvlTree T)
{
    if (T != NULL)
    {
        MakeEmpty(T->left);
        MakeEmpty(T->right);
        free(T);
    }
    return NULL;
}

Position Find (ElemType X, AvlTree T)
{
    if (T == NULL)
        return NULL;
    else if (X < T->elem)
        return Find(X, T->left);
    else if (X > T->elem)
        return Find(X, T->right);
    else
        return T;
}

Position FindMin (AvlTree T)
{
    if (T != NULL)
    {
        while (T->left != NULL) {
            T = T->left;
        }
    }
    return T;
}

Position FindMax (AvlTree T)
{
    if (T != NULL)
    {
        while (T->right != NULL) {
            T = T->right;
        }
    }
    return T;
}

static int Height (Position P)
{
    if (P == NULL)
        return -1;
    return P->height;
}

static Position SingleRotateWithLeft (Position k2)
{
    Position k1;
    k1 = k2->left;
    k2->left = k1->right;
    k1->right = k2;
    
    k2->height = Max(Height(k2->left), Height(k2->right)) + 1;
    k1->height = Max(Height(k1->left), Height(k1->right)) + 1;
    
    return k1;
}

static Position SingleRotateWithRight (Position k2)
{
    Position k1;
    k1 = k2->right;
    k2->right = k1->left;
    k1->left = k2;
    
    k2->height = Max(Height(k2->left), Height(k2->right)) + 1;
    k1->height = Max(Height(k1->left), Height(k1->right)) + 1;
    
    return k1;
}

static Position DoubleRotateWithLeft (Position k3)
{
    Position k2 = SingleRotateWithRight(k3->left);
    
    return SingleRotateWithLeft(k3);
}

static Position DoubleRotateWithRight (Position k3)
{
    Position k2 = SingleRotateWithLeft(k3->right);
    
    return SingleRotateWithRight(k3);
}

AvlTree Insert (ElemType X, AvlTree T)
{
    if (T == NULL)
    {
        T = malloc(sizeof(struct AvlNode));
        if (T == NULL)
            exit(OVERFLOW);
        else
        {
            T->elem = X;
            T->left = T->right = NULL;
            T->height = 0;
        }
    }
    else if (X < T->elem)
    {
        T->left = Insert(X, T->left);
        if (Height(T->left) - Height(T->right) == 2)
        {
            if (X < T->left->elem)
                T = SingleRotateWithLeft(T);
            else
                T = DoubleRotateWithLeft(T);
        }
    }
    else if (X > T->elem)
    {
        T->right = Insert(X, T->right);
        if (Height(T->right) - Height(T->left) == 2)
        {
            if (X > T->right->elem)
                T = SingleRotateWithRight(T);
            else
                T = DoubleRotateWithRight(T);
        }
    }
    
    T->height = Max(Height(T->left), Height(T->right)) + 1;
    return T;
}

AvlTree Delete (ElemType X, AvlTree T)
{
    Position TmpCell;
    
    if (T == NULL)
        printf("Can not delete empty tree");
    else if (X < T->elem)
        T->left = Delete(X, T);
    else if (X > T->elem)
        T->right = Delete(X, T);
    else if (T->left && T->right)
    {
        TmpCell = FindMin(T->right);
        T->elem = TmpCell->elem;
        T->right = Delete(T->elem, T->right);
    }
    else
    {
        TmpCell = T;
        if (T->left == NULL)
            T = T->right;
        else if (T->right == NULL)
            T = T->left;
        free(TmpCell);
    }
    
    return T;
}

int main (int argc, char *argv[])
{

}
```