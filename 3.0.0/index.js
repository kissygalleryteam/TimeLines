var $ = require('node').all;
var Base = require('base');
var D = require('dom');
var E = require('event');
var Anim = require('anim');
var TimeLines = Base.extend({
    /**
     * 初始化
     * @return {[type]} [description]
     */
    initializer: function () {
        debugger;
        var self = this;
        self.el = self.get('container');
        D.css(self.el, {
            'position': 'relative',
            'padding-top': '10px'
        });
        self.curdate = self.get('curDate') || null;
        //标记是否有不同年份
        var initYear = new Date().getFullYear();
        self.hashYear = {};
        self.hashYear[initYear] = true;
        self.outerw = D.outerWidth(self.el);
        //标记今天的日子
        self.today = self.get('today') || self.formatDate(new Date(), 'yyyy-MM-dd');
        self.isReToday = (self.today === self.curdate);
        self._initDateGrid(self.get('data'));
    }
    /**
     * 初始化TimeLine布局
     * @type {Array}
     */, _initDateGrid: function (data) {
        var self = this;
        try {
            if (!self._typeof(data, 'Array')) {
                var err = new Error();
                err.name = '类型出错';
                err.message = '传入的data不是数组!';
                throw(err);
            }
            var timebody = self._initTimeNode('wrap', {
                end: true
            });
            timebody += self._initTimeNode('line', {
                num: 3
            });
            //如果今天比数组的第一个日期还小就把今天放在最前面
            if (self._getTimeMs(self.today) < self._getTimeMs(data[0].date)) {
                timebody = self._addmission(timebody, {
                    before: null,
                    after: data[0].date
                });
            }
            //装载节点
            S.each(data, function (item, index) {
                //如果不是同一年，就打上跨年标记
                if (!self._isSameYear(item.date)) {
                    timebody += self._initTimeNode('dot', {
                        time: self.formatDate(item.date, 'yyyy')
                    });
                }
                //add node
                if (!(index === 0 && self.today === item.date)) {
                    var _booleanCur = self.curdate && (item.date == self.curdate);
                    if (self.today !== item.date || _booleanCur) {
                        //如果配置了时间就点亮
                        var _nodeType = _booleanCur ? 'cur' : 'node';
                        timebody += self._initTimeNode(_nodeType, {
                            time: self.formatDate(item.date, 'MM.dd')
                        });
                    }

                }
                if (self.today === item.date) {
                    self.isReToday = true;
                }
                //两个日期跨度太大的时候增加省略号
                timebody = self._addmission(timebody, {
                    before: item.date,
                    after: data[index + 1] && data[index + 1].date
                });
            });
            if (self.outerw > 0) {
                timebody += self._initTimeNode('line', {
                    num: Math.ceil(self.outerw / 16)
                });
            }
            D.append(D.create(timebody + '</div></div>'), self.el);
            self.elwrap = D.get('.timeline-wrap', self.el);
            //bind events
            self._initNodeEvents(data);
        } catch (e) {
            console.log(e.message);
        }
    }
    /**
     * 初始化节点
     * @param  {[type]} type [description]
     * @param  {[type]} end  [description]
     * @param  {[type]} time [description]
     * @param  {[type]} num  [description]
     * @return {[type]}      [description]
     */, _initTimeNode: function (type, cfg) {
        var self = this;
        var timeArray = {
            wrap: '<div class="timeline-wrap"><div class="timeline-main">',
            node: '<div class="timeline-node">',
            line: '<div class="timeline-line">',
            omission: '<div class="timeline-omission">',
            shine: '<div class="timeline-node timeline-blue-node">',
            cur: '<div class="timeline-cur-left"></div><div class="timeline-node timeline-cur">',
            dot: '<div class="timeline-dot">'
        };
        var w = {
            node: 40,
            line: 16,
            omission: 20,
            shine: 40,
            cur: 120,
            dot: 33
        };
        if (type !== 'wrap') {
            var _num = (cfg && cfg.num) || 1;
            self.outerw -= w[type] * _num;
        }
        var _node = timeArray[type];
        if (cfg && cfg.time) {
            _node += '<a>' + cfg.time + '</a>';
        }
        if (cfg && cfg.end) {
            return _node;
        }
        if (type === 'cur') {
            _node += '</div><div class="timeline-cur-right">';
        }
        if (cfg && cfg.num) {
            _node += '</div>';
            for (var i = 0; i < cfg.num; i++) {
                _node += timeArray[type] + '</div>';
                self.outerw -= w[type];
            }
            return _node;
        }
        return _node + '</div>';
    }, _addToady: function (body) {
        //放入今天的日期
        var self = this;
        //如果设置了点亮日期并且今天要不等于设置的点亮日期
        if (self.curdate && self.today != self.curdate) {
            return body + self._initTimeNode('shine', {
                time: self.formatDate(self.today, 'MM.dd')
            });
        }
        return body;
    }
    /**
     * 日期跨度间隔大的增加省略号
     * @return {[type]} [description]
     */, _addmission: function (body, date) {
        var self = this;
        var _today = self._getTimeMs(self.today);
        var _before, _after;
        if (!date.before && date.after) {
            _after = self._getTimeMs(date.after);
            body = self._addToady(body);
            body = cons(_today, _after);
            return body;
        }
        //before time
        _before = self._getTimeMs(date.before);
        if (!date.after) {
            if (_today > _before) {
                body = cons(_before, _today);
                body = self._addToady(body);
            }
            return body;
        }
        //after time
        _after = self._getTimeMs(date.after);

        if (_today >= _before && _today < _after) {
            if (_today !== _before) {
                body = cons(_before, _today);
            }
            //增加今天日期的标识
            body = self._addToady(body);
            if (_today !== _after) {
                body = cons(_today, _after);
            }
        } else {
            body = cons(_before, _after);
            // body = self._addToady(body);
        }
        return body;

        function cons(before, after) {
            var diff = (after - before) / (3600 * 1000 * 24);
            var num = Math.floor(diff / 30);
            num = num > 2 ? 2 : num;
            // if (diff > 6) {
            //   return body += self._initTimeNode('omission', {
            //     num: num
            //   });
            // } else if (){
            //   return body;
            // }
            switch (true) {
                case diff > 2 && diff < 6:
                    return body += self._initTimeNode('dot');
                    break;
                case diff > 6:
                    return body += self._initTimeNode('omission', {
                        num: num
                    });
                    break;
                default:
                    return body;
            }
        }
    }, _getTimeMs: function (date) {
        return new Date(date).getTime();
    }
    /**
     * 数据类型的检测
     * @param  {[type]} obj  [description]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */, _typeof: function (obj, type) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }, _isSameYear: function (date) {
        var self = this;
        var _year = new Date(date).getFullYear();
        if (!self.hashYear[_year]) {
            self.hashYear[_year] = true;
            return false;
        }
        return true;
    }, _initNodeEvents: function (data) {
        var self = this;
        var nodes = D.query('.timeline-node', self.el);
        S.each(nodes, function (item, index) {
            if (!self.isReToday && D.hasClass(item, 'timeline-blue-node')) {
                D.css(item, {
                    cursor: 'default'
                });
                nodes.splice(index, 1);
            }
        });
        var wrapleft = D.offset(self.elwrap).left;
        //queue tips
        var tipQueue = [];
        var tipTotal = {};
        S.each(nodes, function (item, index) {
            var _data = data[index];
            var _left = D.offset(item).left;
            _data.left = _left - wrapleft + Math.ceil(D.outerWidth(item) / 2);
            var _tipisarr = self._typeof(_data.tip, 'Array');
            var _pushtip;
            if (_tipisarr) {
                for (var i = 0, len = _data.tip.length; i < len; i++) {
                    _pushtip = {
                        left: _data.left,
                        date: _data.date,
                        tip: _data.tip[i]
                    }
                    tipQueue.push(_pushtip);
                }
                tipTotal[index] = len;
            } else {
                tipQueue.push(_data);
                tipTotal[index] = 1;
            }
            var _sdata, _index, _count;
            E.on(item, 'mouseover', function (e) {
                self.anim && self.anim.stop();
                _index = _tipisarr ? Math.floor(Math.random() * _data.tip.length) : 0;
                _count = 0;
                for (var i = 0; i < index; i++) {
                    _count += tipTotal[i];
                }
                self._tipIndex = _count + _index;
                if (_tipisarr) {
                    _sdata = {
                        left: _data.left,
                        date: _data.date,
                        tip: _data.tip[_index]
                    }
                } else {
                    _sdata = _data;
                }
                self._initTips(_sdata);
            });
        });
        //stop anim
        E.on(self.elwrap, 'mouseover mouseout', function (e) {
            switch (e.type) {
                case 'mouseover':
                    self.anim && self.anim.stop(true);
                    clearTimeout(self.tipsInter);
                    break;
                case 'mouseout':
                    interTips();
                    break;
            }
        });
        self._tipQueue = tipQueue;
        self._tipIndex = 0;
        self.tipsInter = null;
        // self._initTips(self._tipQueue[self._tipIndex ++]);
        interTips();

        function interTips() {
            self.tipsInter = setTimeout(function () {
                self._tipIndex = self._tipIndex > (self._tipQueue.length - 1) ? 0 : self._tipIndex;
                self._initTips(self._tipQueue[self._tipIndex++]);
                interTips();
            }, 1500);
        }
    }, _initTips: function (data) {
        var self = this;
        var cfg = {
            left: data.left,
            tip: self._typeof(data.tip, 'Array') ? data.tip[0] : data.tip
        }
        var oTip = self._tips;
        if (!self._tips) {
            var tips = '<div class="tip" style="left:' + cfg.left + 'px">' + '<div class="arrow-grey"><div class="arrow"></div></div>' + '<span>' + cfg.tip + '</span>' + '</div>';
            self._tips = D.create(tips);
            if (data.date === self.curdate) {
                D.addClass(self._tips, 'tip-cur');
            } else {
                D.removeClass(self._tips, 'tip-cur');
            }
            D.append(self._tips, self.el);
            D.css(self._tips, {
                'margin-left': -D.outerWidth(self._tips) / 2
            });
        } else {
            D.get('span', self._tips).innerHTML = cfg.tip;
            self.anim && self.anim.stop();
            if (data.date === self.curdate) {
                D.addClass(self._tips, 'tip-cur');
            } else {
                D.removeClass(self._tips, 'tip-cur');
            }
            self.anim = new Anim(self._tips, {
                left: cfg.left,
                marginLeft: -D.outerWidth(self._tips) / 2
            }, 0.5, 'easeBoth', false, function () {

            }).run();
        }

    }
    /**
     * 日期格式化
     * @param  {[type]} date   [des]
     * @param  {[type]} format [description]
     * @return {[type]}        [description]
     */, formatDate: function (date, format) {
        var now = new Date(date);
        var o = {
            "M+": now.getMonth() + 1, //month
            "d+": now.getDate(), //day
            "h+": now.getHours(), //hour
            "m+": now.getMinutes(), //minute
            "s+": now.getSeconds(), //second
            "q+": Math.floor((now.getMonth() + 3) / 3), //quarter
            "S": now.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (now.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1,
                        RegExp.$1.length == 1 ? o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length));
            }
        }

        return format;
    }
});
module.exports = TimeLines;



