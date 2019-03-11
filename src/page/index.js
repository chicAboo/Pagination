require('../component/pagination.css');
require('../component/pagination');

const _pagination = {
    init: function () {
        this.basePagination();
        this.pagePagination();
        this.setPaginationWord();
        this.jumpPaginationCallBack();
    },
    /**
     *  基础分页
     * */
    basePagination: () => {
        $('.basePagination').Pagination({
            isJumpPage: false
        });
    },
    /**
     *  跳转指定页
     * */
    pagePagination: () => {
        $('.pagePagination').Pagination({
            currentPage: 1,
            numberOfPages: 3,
            total: 6,
            isJumpPage: true,
        });
    },
    /**
     *  文字设置
     * */
    setPaginationWord: () => {
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
    },
    /**
     *  跳转回调
     * */
    jumpPaginationCallBack: () => {
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
    }
};

$(function () {
    _pagination.init();
});
