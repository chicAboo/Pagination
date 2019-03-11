/**
 * Created by zhutao on 2018/6/29.
 */

;
(function () {
    /**
     *  @param element DOM
     *  @param config 配置项
     *  {
     *      currentPage         当前页
     *      numberOfPages       中间显示个数(只能是大于3的奇数)
     *      total               总页数
     *      isJumpPage          是否显示跳转页
     *      jumpItems           跳转、页
     *      itemTexts           第一页、上一页、下一页、最后一页名称
     *      onPageChanged       选择的回调
     *  }
     * */
    function Pagination (element, config) {
        this.ele = element;
        this.config = {
            currentPage: 1,
            numberOfPages: 3,
            total: 1,
            isJumpPage: true,
            jumpItems: {
                jumpTo: 'jump to',
                page: 'page'
            },
            itemTexts: {
                first: '&lt;&lt;',
                prev: '&lt;',
                next: '&gt;',
                last: '&gt;&gt;'
            },
            onPageChanged: function () {
            }
        };
        if (config && $.isPlainObject(config)) {
            this.config = $.extend({}, this.config, config);
        }
    }

    Pagination.prototype = {
        init: function () {
            var _this = this;
            _this.createPagination();
        },
        createPagination: function () {
            var _this = this,
                _html = '',
                _itemTexts = _this.config.itemTexts,
                _jumpItems = _this.config.jumpItems,
                _config = _this.config,
                _currPages = _config.currentPage,   //当前页
                _numberOfPage = _config.numberOfPages, //中间页
                _pageNums = _config.total;  //总数

            var noAllowed = (_pageNums === 1) ? 'no-allowed' : '';
            _html += '<ul class="pagination">';
            //是否显示第一页和上一页
            if (_currPages > 1 || _pageNums === 1) {
                _html += '<li class="'+ noAllowed +'" data-type="first"><a title="第一页">'+ _itemTexts.first +'</a></li>';
                _html +='<li class="'+ noAllowed +'" data-type="prev"><a title="上一页">'+ _itemTexts.prev +'</a></li>';
            }
            //显示开始...
            if (_currPages > _numberOfPage - 1 && _pageNums > _numberOfPage - 1) {
                if (_numberOfPage !== 1) {
                    _html += '<li data-type="number" data-index="1"><a title="转到页_1">1</a></li>';
                }
                if (_numberOfPage <= 3) {
                    if (_currPages > _numberOfPage && _pageNums !== 4) {
                        _html += '<li data-type="point"><span>...</span></li>';
                    }
                } else {
                    if (_currPages >= _numberOfPage && _pageNums !== 4) {
                        _html += '<li data-type="point"><span>...</span></li>';
                    }
                }
            }
            //判断开始索引和结束索引
            var start, end;
            if (_currPages > _numberOfPage - 1 && _currPages <= _pageNums - 2) {
                start = _currPages - (_numberOfPage - 1) / 2;
                end = _currPages + (_numberOfPage - 1) / 2;
            } else if (_currPages > _numberOfPage - 1 && _currPages > _pageNums - 2) {
                if (_pageNums === 3 && _currPages ===3) {
                    start = _pageNums - _numberOfPage + 2;
                } else {
                    start = _pageNums - _numberOfPage + 1;
                }
                end = _pageNums;
            } else {
                start = 1;
                end = (_pageNums < 3) ? _pageNums : _numberOfPage;
            }
            //中间键显示
            for (; start <= end; start++) {
                if (_config.currentPage === start) {
                    _html += '<li class="active" data-type="number" data-index="'+ start +'"><a title="转到页_'+ start +'">'+ start +'</a></li>';
                } else {
                    _html += '<li data-type="number" data-index="'+ start +'"><a title="转到页_'+ start +'">'+ start +'</a></li>';
                }
            }
            //显示结束...
            if (end < _pageNums) {
                if (end < _pageNums - 1) {
                    _html += '<li data-type="point"><span>...</span></li>';
                }
                if (_numberOfPage !== 1) {
                    _html += '<li data-type="number" data-index="'+ _pageNums +'"><a title="转到页_'+ _pageNums +'">'+ _pageNums +'</a></li>';
                }
            }

            //判断下一页和最后一页是否显示
            if (_currPages < _pageNums || _pageNums === 1) {
                _html += '<li class="'+ noAllowed +'" data-type="next"><a title="下一页">'+ _itemTexts.next +'</a></li>';
                _html += '<li class="'+ noAllowed +'" data-type="last"><a title="最后一页">'+ _itemTexts.last +'</a></li>';
            }
            //跳转至
            if (_this.config.isJumpPage && _this.config.total > 1) {
                _html += '<li data-type="jump" data-type="jump"> ' +
                    '<button class="btn-page jumpToPage">'+ _jumpItems.jumpTo +'</button>' +
                    '<input type="text" id="inp-page" class="input-page"onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,\'\')}else{this.value=this.value.replace(/\D/g,\'\')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,\'\')}else{this.value=this.value.replace(/\D/g,\'\')}"> ' +
                    '<button class="btn-page no-pointer">'+ _jumpItems.page +'</button></li>';
            }

            _this.ele.html(_html);
            _this.eventBind();
        },
        /**
         *  事件绑定
         * */
        eventBind: function () {
            var _this = this,
                _currPage = _this.config.currentPage,
                _pagination = _this.ele.find('.pagination');
            _pagination.off('click').on('click', 'li', function () {
                var $this = $(this),
                    _dataType = $this.attr('data-type'),
                    _active = $this.attr('class');

                //如果总页数只有1页，则无点击事件
                if (_this.config.total === 1) return;

                //判断选择的类型（第一页、上一页、下一页、最后一页、页数和点）
                switch (_dataType) {
                    case 'first':
                        _this.config.currentPage = 1;
                        break;
                    case 'prev':
                        _this.config.currentPage = _currPage - 1;
                        break;
                    case 'number':
                        _this.config.currentPage = parseInt($this.attr('data-index'));
                        break;
                    case 'next':
                        _this.config.currentPage = _currPage + 1;
                        break;
                    case 'last':
                        _this.config.currentPage = _this.config.total;
                        break;
                    case 'jump':

                        break;
                    case 'point':
                        break;
                }
                //点和当前选中无回调
                if (_dataType !== 'point' && _active !== 'active' && _dataType !== 'jump') {
                    _this.createPagination();
                    _this.config.onPageChanged(_this.config, _this.ele);
                }
            });
            //跳转指定页面
            _pagination.on('keyup', '#inp-page', function (e) {
                 var evt = e || window.e;
                 var _value = $(this).val(),
                     _val = parseInt(_value),
                    maxIndex = parseInt($('.pagination li[data-type=number]').last().attr('data-index'));

                //如果跳转页超出分页最大数
                if (maxIndex < _val || _val < 1 || _val == _this.config.currentPage) {
                    return;
                }
                //enter
                 if (evt.keyCode == 13) {
                     if (_value.length > 0) {
                         _this.config.currentPage = _val;
                         _this.createPagination();
                         _this.config.onPageChanged(_this.config, _this.ele);
                     }
                 }

            });

            //点击jumpTo跳转
            _pagination.on('click', '.jumpToPage', function (e) {
                var _value = $(this).next().val(),
                    _val = parseInt(_value),
                    maxIndex = parseInt($('.pagination li[data-type=number]').last().attr('data-index'));

                //如果跳转页超出分页最大数
                if (maxIndex < _val || _val < 1 || _val == _this.config.currentPage) {
                    return;
                }

                if (_value.length > 0) {
                    _this.config.currentPage = _val;
                    _this.createPagination();
                    _this.config.onPageChanged(_this.config, _this.ele);
                }
            });
        }
    };

    window.Pagination = Pagination;
    $.fn.Pagination = function (config) {
        var pagination = new Pagination(this, config);
        return pagination.init();
    }

})(window.jQuery || $);
