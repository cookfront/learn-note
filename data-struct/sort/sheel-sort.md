希尔排序
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

void ShellSort (ElemType arr[], int n)
{
    int i, j, increment;
    ElemType tmp;
    for (increment = n / 2; increment > 0; increment /= 2)
    {
        for (i = increment; i < n; i++) {
            tmp = arr[i];
            for (j = i; j >= increment && arr[j - increment] > tmp; j -= increment)
            {
                arr[j] = arr[j - increment];
            }
            arr[j] = tmp;
        }
    }
}

void printArr (ElemType arr[], int n)
{
    for (int i = 0; i < n; i++)
        printf("%d\t", arr[i]);
    printf("\n");
}

int main (int argc, char *argv[])
{
    ElemType arr[] = {8, 78, 53, 160, 43, 34, 89, 129};
    printArr(arr, 8);
    ShellSort(arr, 8);
    printArr(arr, 8);
    return 0;
}
```