归并排序
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

void mergeArray (ElemType arr[], ElemType tmpArr[], int first, int mid, int last)
{
    int i = first, j = mid + 1;
    int m = mid, n = last;
    int k = 0;
    
    while (i <= m && j <= n)
        tmpArr[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
    
    while (i <= m)
        tmpArr[k++] = arr[i++];
    
    while (j <= n)
        tmpArr[k++] = arr[j++];
    
    for (i = 0; i < k; i++)
        arr[first + i] = tmpArr[i];
}

void mSort (ElemType arr[], ElemType tmpArr[], int left, int right)
{
    if (left < right)
    {
        int center = (left + right) / 2;
        mSort(arr, tmpArr, left, center);
        mSort(arr, tmpArr, center + 1, right);
        mergeArray(arr, tmpArr, left, center, right);
    }
}

void mergeSort (ElemType arr[], int n)
{
    ElemType *tmpArr;
    
    tmpArr = malloc(n * sizeof(ElemType));
    if (tmpArr != NULL)
    {
        mSort(arr, tmpArr, 0, n - 1);
        free(tmpArr);
    }
    else
        printf("error");
}

int main (int argc, char *argv[])
{
    ElemType arr[] = {8, 34, 53, 160, 43, 78, 89, 129};
    printArr(arr, 8);
    mergeSort(arr, 8);
    printArr(arr, 8);
    return 0;
}
```