数据结构之图
========

## 无向图和有向图

一个图就是由顶点集`V`和边集`E`组成，每一条边就是一个点对`(v, w)`。那么对于每一条边是否有方向我们可以分成两类图：

 - 无向图：边没有方向，例如`(v, w)`和`(w, v)`是等价的
 - 有向图：点对是有序的，即边是有方向的。`(v, w)`和`(w, v)`则是两条不同的边

当然有时候，边还可能具有一个权值，可以想象一下街道的车流量，有的街道车流量多，权值高。

## 连通性

对于`无向图`，如果在一个无向图中从每一个顶点到每个其他顶点都存在一条路径，则称该无向图是`连通`的。

对于`有向图`，具有上面这种性质的有向图我们称之为`强连通`的。如果`有向图`不是`强连通`的，但是去除边上的方向后的图，是连通的，那么我们称该有向图为`弱连通`。

## 图的表示

### 邻接矩阵表示法

表示图一种简单的方法就是使用`二维数组`，我们称之为`邻接矩阵表示法`，对于每条边`(u, v)`，我么 置`A[u][v] = 1`，否则为0，如果边有一个权，我们就置`A[u][v]`为这个权值。

这种表示法优点就是`简单`，但它对于稀疏的图，浪费是很大的，它的空间需求为O(|V|<sup>2</sup>)，例如：如果有3000个路口，我们就可以得到有3000个顶点的图，该图有12000条边，但是我们却用了`9 000 000`个数组元素来表示图，这显然浪费时巨大的。因此这种表示法对于`稠密`的图表示是合适的。

```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_VERTEX 100
#define isLetter(a)  ((((a)>='a')&&((a)<='z')) || (((a)>='A')&&((a)<='Z')))
#define LENGTH(a)  (sizeof(a)/sizeof(a[0]))

// 邻接矩阵
typedef struct _graph
{
    char vexs[MAX_VERTEX];              // 顶点集合
    int vexnum;                         // 顶点数
    int edgnum;                         // 边数
    int matrix[MAX_VERTEX][MAX_VERTEX]; // 邻接矩阵
}Graph, *PGraph;

/*
 * 返回ch在matrix矩阵中的位置
 */
static int get_position(Graph g, char ch)
{
    int i;
    for(i = 0; i < g.vexnum; i++)
        if(g.vexs[i] == ch)
            return i;
    return -1;
}

/*
 * 读取一个输入字符
 */
static char read_char()
{
    char ch;
    
    do {
        ch = getchar();
    } while(!isLetter(ch));
    
    return ch;
}

/*
 * 创建图(自己输入)
 */
Graph* create_graph()
{
    char c1, c2;
    int v, e;
    int i, p1, p2;
    Graph* pG;
    
    // 输入"顶点数"和"边数"
    printf("input vertex number: ");
    scanf("%d", &v);
    printf("input edge number: ");
    scanf("%d", &e);
    if ( v < 1 || e < 1 || (e > (v * (v-1))))
    {
        printf("input error: invalid parameters!\n");
        return NULL;
    }
    
    if ((pG = (Graph*)malloc(sizeof(Graph))) == NULL )
        return NULL;
    memset(pG, 0, sizeof(Graph));
    
    // 初始化"顶点数"和"边数"
    pG->vexnum = v;
    pG->edgnum = e;
    // 初始化"顶点"
    for (i = 0; i < pG->vexnum; i++)
    {
        printf("vertex(%d): ", i);
        pG->vexs[i] = read_char();
    }
    
    // 初始化"边"
    for (i = 0; i < pG->edgnum; i++)
    {
        // 读取边的起始顶点和结束顶点
        printf("edge(%d):", i);
        c1 = read_char();
        c2 = read_char();
        
        p1 = get_position(*pG, c1);
        p2 = get_position(*pG, c2);
        if (p1==-1 || p2==-1)
        {
            printf("input error: invalid edge!\n");
            free(pG);
            return NULL;
        }
        
        pG->matrix[p1][p2] = 1;
        pG->matrix[p2][p1] = 1;
    }
    
    return pG;
}

/*
 * 打印矩阵队列图
 */
void print_graph(Graph G)
{
    int i, j;
    
    printf("Martix Graph:\n");
    for (i = 0; i < G.vexnum; i++)
    {
        for (j = 0; j < G.vexnum; j++)
            printf("%d ", G.matrix[i][j]);
        printf("\n");
    }
}

int main()
{
    Graph* pG;
    
    // 自定义"图"(输入矩阵队列)
    //pG = create_graph();
    // 采用已有的"图"
    pG = create_graph();
    // 打印矩阵队列
    print_graph(*pG);
    return 0;
}
```

### 邻接表表示法

如果图是`稀疏`的，我们可以使用`邻接表表示法`来表示图：对每一个顶点，我们使用一个表存放所有邻接的顶点，此时的空间需求为`O(|E| + |V|)`。

```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_VERTEX 100
#define isLetter(a)  ((((a)>='a')&&((a)<='z')) || (((a)>='A')&&((a)<='Z')))
#define LENGTH(a)  (sizeof(a)/sizeof(a[0]))

typedef struct _ENode
{
    int ivex;
    struct _ENode *next_edge;
} ENode, *PENode;

typedef struct _VNode
{
    char data;
    struct ENode *first_edge;
} VNode, *PVNode;

typedef struct _LGraph
{
    int vexnum;
    int edgnum;
    VNode vexs[MAX_VERTEX];
} LGraph;

static int get_position (LGraph g, char ch)
{
    int i;
    for (i = 0; i < g.vexnum; i++)
        if (ch == g.vexs[i].data)
            return i;
    return -1;
}

static char read_char()
{
    char ch;
    
    do {
        ch = getchar();
    } while(!isLetter(ch));
    
    return ch;
}

static void link_last(ENode *list, ENode *node)
{
    ENode *p = list;
    
    while(p->next_edge)
        p = p->next_edge;
    p->next_edge = node;
}

/*
 * 创建邻接表对应的图(自己输入)
 */
LGraph* create_lgraph()
{
    char c1, c2;
    int v, e;
    int i, p1, p2;
    ENode *node1, *node2;
    LGraph* pG;
    
    // 输入"顶点数"和"边数"
    printf("input vertex number: ");
    scanf("%d", &v);
    printf("input edge number: ");
    scanf("%d", &e);
    if ( v < 1 || e < 1 || (e > (v * (v-1))))
    {
        printf("input error: invalid parameters!\n");
        return NULL;
    }
    
    if ((pG=(LGraph*)malloc(sizeof(LGraph))) == NULL )
        return NULL;
    memset(pG, 0, sizeof(LGraph));
    
    // 初始化"顶点数"和"边数"
    pG->vexnum = v;
    pG->edgnum = e;
    // 初始化"邻接表"的顶点
    for(i=0; i<pG->vexnum; i++)
    {
        printf("vertex(%d): ", i);
        pG->vexs[i].data = read_char();
        pG->vexs[i].first_edge = NULL;
    }
    
    // 初始化"邻接表"的边
    for(i=0; i<pG->vexnum; i++)
    {
        // 读取边的起始顶点和结束顶点
        printf("edge(%d): ", i);
        c1 = read_char();
        c2 = read_char();
        
        p1 = get_position(*pG, c1);
        p2 = get_position(*pG, c2);
        // 初始化node1
        node1 = (ENode*)malloc(sizeof(ENode));
        node1->ivex = p2;
        // 将node1链接到"p1所在链表的末尾"
        if(pG->vexs[p1].first_edge == NULL)
            pG->vexs[p1].first_edge = node1;
        else
            link_last(pG->vexs[p1].first_edge, node1);
        // 初始化node2
        node2 = (ENode*)malloc(sizeof(ENode));
        node2->ivex = p1;
        // 将node2链接到"p2所在链表的末尾"
        if(pG->vexs[p2].first_edge == NULL)
            pG->vexs[p2].first_edge = node2;
        else
            link_last(pG->vexs[p2].first_edge, node2);
    }
    
    return pG;
}
```

## 拓扑排序

拓扑排序是对有向无圈图对顶点对一种排序，它使得如果存在一条从v<sub>i</sub>到v<sub>j</sub>的路径，那么在排序中v<sub>j</sub>出现在v<sub>i</sub>的后面。

显然，在这里如果图是有圈的，拓扑排序将是不可能的。

