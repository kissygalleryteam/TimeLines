## TimeLines是一个基于日期的事件提示的时间组件，目前在数据平台直播间中使用。

* 版本：1.0
* 教程：[http://gallery.kissyui.com/TimeLines/1.0/guide/index.html](http://gallery.kissyui.com/TimeLines/1.0/guide/index.html)
* demo：[http://gallery.kissyui.com/TimeLines/1.0/demo/index.html](http://gallery.kissyui.com/TimeLines/1.0/demo/index.html)

## 初始化组件
```
    S.use('gallery/TimeLines/1.0/index', function (S, TimeLines) {
         /**
          * data需要是一个数组
          * 每一个源由date和tip组成
          * tip可以是数组，如果是数组，会顺序轮播完该日期下的事件
          * 如果是hover有多个事件的点，会随机展示其中一个事件内容
          * 目前日期没有作重新排序处理，所以要求数据源要按顺序传入
          */
        var data = [{
          "date": "2013-10-01",
          "tip": ["去年买了个登山包", "今年在双十一必须买土豪金"]
        }, {
          "date": "2013-11-10",
          "tip": "活动预热"
        }, {
          "date": "2013-11-11",
          "tip": "双11启动，土豪金，fighting!"
        }];
         
         new TimeLines({
            container : "#timeline"//容器
           ,data : data//数据源
           ,curDate : "2013-11-11"//被点亮的日期，该日期需要在数据源中存在
         });
    })
```
![TIMELINES](http://gtms02.alicdn.com/tps/i2/T1UUS3FdFcXXX8JDoo-743-151.jpg)

## changelog

### TODO

  + 支持日期的自动排序和同一日期的去重和事件合并
  + 支持拖拽

### V1.0

    [!]



