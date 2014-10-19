插入排序
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

typedef int ElemType;

void printArr (ElemType arr[], int n)
{
    for (int i = 0; i < n; i++)
        printf("%d\t", arr[i]);
    printf("\n");
}

void insertionSort (ElemType arr[], int n)
{
    int i, j;
    ElemType tmp;
    
    for (i = 1; i < n; i++)
    {
        tmp = arr[i];
        for (j = i; j > 0 && arr[j - 1] > tmp; j--)
            arr[j] = arr[j-1];
        arr[j] = tmp;
    }
}

int main (int argc, char *argv[])
{
    ElemType arr[] = {8, 34, 20, 60, 40, 78};
    printArr(arr, 6);
    insertionSort(arr, 6);
    printArr(arr, 6);
    return 0;
}
```