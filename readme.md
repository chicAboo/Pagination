### 安装
`npm install`

### 运行
`npm run dev`

### 使用方法

###### 1. 基础分页
```
    $('.basePagination').Pagination({
        isJumpPage: false
    });
```
`isJumpPage`是否显示可跳转输入框，默认true

###### 2. 跳转指定页
```
    $('.pagePagination').Pagination({
        currentPage: 1,
        numberOfPages: 3,
        total: 6,
        isJumpPage: true,
    });
```
`currentPage`当前页， numberOfPages中间显示个数(只能大于3的奇数)，total总页数

###### 3. 文字设置
```
    $('.setPaginationWord').Pagination({
        currentPage: 1,
        numberOfPages: 3,
        total: 9,
        isJumpPage: true,
        itemTexts: {
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '最后一页'
        },
        jumpItems: {
            jumpTo: '跳转到',
            page: '页'
        },
    });
```

###### 4. 跳转回调
```
    $('.jumpPaginationCallBack').Pagination({
        currentPage: 1,
        numberOfPages: 3,
        total: 12,
        isJumpPage: true,
        itemTexts: {
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '最后一页'
        },
        jumpItems: {
            jumpTo: '跳转到',
            page: '页'
        },
        onPageChanged: function (option, element) {
            console.log(option);
            console.log(element);
            alert(`跳转到${option.currentPage}页`);
        }
    });
```
`isFooter`是否显示底部，true为显示，默认为true

### API
###### 1. 参数
参数|说明|类型|默认值
---|:--:|---:|---
currentPage|当前页|Number|1
numberOfPages|中间显示个数(只能是大于3的奇数)|Number|3
total|总页数|Number|1
isJumpPage|是否显示跳转页：true为显示|Boolean|true
jumpItems:{jumpTo,page}|跳转文本|string|jump to、page
itemTexts{first、prev、next、last}|文本|string|&lt;&lt;、&lt;、&gt;、&gt;&gt;

###### 2. 方法
参数|说明
---|:---
onPageChanged(option, element)|选中回调(option：当前选中页的回调信息，element:分页DOM)
