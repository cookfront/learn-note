堆排序
========

```c
#include <stdio.h>
#include <stdlib.h>

typedef int ElemType;

#define LeftChild(i) (2 * i + 1)

void PrecDown (ElemType arr[], int i, int n)
{
    int child;
    ElemType tmp;
    
    for (tmp = arr[i]; LeftChild(i) < n; i = child)
    {
        child = LeftChild(i);
        if (child != n - 1 && arr[child + 1] > arr[child])
            child++;
        if (tmp < arr[child])
        {
            arr[i] = arr[child];
        }
        
        else
            break;
    }
    arr[i] = tmp;
}

void swap (ElemType *a, ElemType *b)
{
    ElemType tmp;
    tmp = *a;
    *a = *b;
    *b =tmp;
}

void HeapSort (ElemType arr[], int n)
{
    int i;
    
    for (i = n / 2; i >= 0; i--)
        PrecDown(arr, i, n);
    for (i = n - 1; i > 0; i--)
    {
        swap(&arr[0], &arr[i]);
        PrecDown(arr, 0, i);
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
    ElemType arr[] = {31, 41, 59, 26, 53, 58, 97};
    printArr(arr, 7);
    HeapSort(arr, 7);
    printArr(arr, 7);
    return 0;
}
```