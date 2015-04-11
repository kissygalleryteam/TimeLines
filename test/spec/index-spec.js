KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('timelines', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','kg/timelines/3.0.0/']});