二叉搜索树。


`bst.h`

```c
#ifndef _Tree_H
#define _Tree_H

// define NULL
#ifndef NULL
#define NULL 0
#endif

// define ElementType
typedef int ElementType;
// define TreeNode
typedef struct TreeNode {
	ElementType value;
	struct TreeNode *left;
	struct TreeNode *right;
} *Position, *SearchTree;

// define tree function
SearchTree MakeEmpty (SearchTree T);
Position Find (ElementType X, SearchTree T);
Position FindMin (SearchTree T);
Position FindMax (SearchTree T);
SearchTree Insert (ElementType X, SearchTree T);
SearchTree Delete (ElementType X, SearchTree T);
// ElementType Retrieve (Position P);
void InOrderTraversal (SearchTree T);

#endif
```

`bst.c`

```c
#include "fatal.h"
#include "bst.h"

SearchTree MakeEmpty (SearchTree T)
{
	if (T != NULL)
	{
		MakeEmpty(T->left);
		MakeEmpty(T->right);
		free(T);
	}

	return NULL;
}

Position Find (ElementType X, SearchTree T)
{
	if (T == NULL)
		return NULL;
	else if (X < T->value)
		return Find(X, T->left);
	else if (X > T->value)
		return Find(X, T->right);
	else
		return T;
}

Position FindMin (SearchTree T)
{
	if (T == NULL)
		return NULL;
	else if (T->left == NULL)
		return T;
	else
		return FindMin(T->left);
}

Position FindMax (SearchTree T)
{
	if (T == NULL)
		return NULL;
	else if (T->right == NULL)
		return T;
	else
		return FindMax(T->right);
}

SearchTree Insert (ElementType X, SearchTree T)
{
	if (T == NULL)
	{
		T = malloc(sizeof(struct TreeNode));
		if (T == NULL)
			FatalError("Out of space!!!");
		else
		{
			T->value = X;
			T->left = T->right = NULL;
		}
		printf("%d\n", T->value);
	}
	else if (X < T->value)
		T->left = Insert(X, T->left);
	else if (X > T->value)
		T->right = Insert(X, T->right);

	return T;
}

SearchTree Delete (ElementType X, SearchTree T)
{
	Position tmpCell;

	if (T == NULL)
		Error("Element not found");
	else if (X < T->value)
		T->left = Delete(X, T->left);
	else if (X > T->value)
		T->right = Delete(X, T->right);
	else if (T->left && T->right)
	{
		tmpCell = FindMin(T->right);
		T->value = tmpCell->value;
		T->right = Delete(T->value, T->right);
	}
	else
	{
		tmpCell = T;
		if (T->left == NULL)
			T = T->right;
		else if (T->right == NULL)
			T = T->left;
		free(tmpCell);
	}

	return T;
}

void InOrderTraversal (SearchTree T)
{
	if (T != NULL)
	{
		InOrderTraversal(T->left);
		printf("%d\n", T->value);
		InOrderTraversal(T->right);
	}
}
```

`fatal.h`

```c
#include <stdio.h>  
#include <stdlib.h>  
  
#define Error( Str )        FatalError( Str )  
#define FatalError( Str )   fprintf( stderr, "%s\n", Str ), exit( 1 )
```

`main.c`

```c
#include <stdio.h>
#include <stdlib.h>
#include "bst.h"

int main (int argc, char *argv[])
{
	SearchTree T = NULL;
	int i;

	ElementType data[10] = {10, 23, 11, 98, 111, 87, 34, 11, 33, 8};
	for (int i = 0; i < 10; i++)
		Insert(data[i], T);
	printf("Binary Search Tree\n");
	InOrderTraversal(T);
	exit(0);
}

```

上面的难点主要在于搜索树的删除节点。删除节点时分为以下几种情况：

 - 删除节点没有儿子：直接删除节点
 - 删除节点有一个儿子：只需将左子树或右子树成为删除节点双亲的左子树（删除节点为双亲的左子树），或者将左子树或右子树成为删除节点双亲的右子树（删除节点为双亲的右子树）
 - 删除节点有两个儿子：用其右子树的最小的数据代替该节点的数据，并递归地删除那个节点。或者用左子树的最大的数据代替该节点的数据，并递归的删除那个节点。
