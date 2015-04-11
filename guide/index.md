## 综述

TimeLines是一个基于日期的事件提示的时间组件，目前在数据平台直播间中使用。

## 初始化组件
```
   S.use('kg/timelines/3.0.3/index,kg/timelines/3.0.3/index.css', function (S, line) {
           var data = [
               {
                   "date" : "2013-09-01",
                   "tip": "开学了！"
               },
               {
                   "date" : "2013-09-07",
                   "tip": ["秋季热卖","有的是毛线"]
               },
               {
                   "date" : "2013-09-23",
                   "tip": ["月饼大甩卖","土豪今天和我做了朋友"]
               },
               {
                   "date" : "2013-10-01",
                   "tip" : ["去年买了个登山包","今年在双十一必须买土豪金"]
               },
               {
                   "date" : "2013-10-15",
                   "tip" : "一定要让俗人看看什么才是土豪！"
               },
               {
                   "date" : "2013-11-02",
                   "tip": "活动预热,还有9天双十一"
               },
               {
                   "date" : "2013-11-03",
                   "tip": "活动预热,还有8天双十一"
               },
               {
                   "date" : "2013-11-04",
                   "tip": "活动预热,还有7天双十一"
               },
               {
                   "date" : "2013-11-10",
                   "tip": "活动预热,还有1天双十一"
               },
               {
                   "date" : "2013-11-11",
                   "tip": "双11启动，土豪金，fighting!"
               },
               {
                   "date" : "2014-05-15",
                   "tip" : "又出了个煤老板专用色。。。"
               }
           ];
           new line({
               container : "#J_TimeLine"
               ,data : data
               ,curDate : "2013-11-11"
           });
       })
```
![TIMELINES](http://gtms02.alicdn.com/tps/i2/T1UUS3FdFcXXX8JDoo-743-151.jpg)
