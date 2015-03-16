/**
 * Created by feizq on 15-2-9.
 */
//如何调用支持amd规范的模块，例如jquery

//特别注意此时的路径以调用页面为准，所以此时其实是在page文件夹下面的demo2页面里所以要注意jquery的路径写法

require.config({
    paths: {
        jquery: '../lib/jquery-1.10.2',
        'highcharts':'../lib/highcharts'
    },
    shim:{
        'highcharts':{
            deps:['jquery'],
            exports:'highcharts'
        }
    }
});

//require(['jquery'],function($){
//     alert($().jquery)}
//);
require(['highcharts'],function(highcharts){


    // 好友互粉比率分析
    $('#biFollowPie').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false/*,width:300*/,
            height: 320,
            style:{
                'font-family': '"Microsoft YaHei", "微软雅黑", sans-serif'
            }
        },
        title: {
            text: '互粉<br>比率',
            align: 'center',
            verticalAlign: 'middle',
            y: 39,
            style: {
                'font-weight': 'bold',
                'font-size':'22px'
            }
        },
        tooltip: {
            pointFormat: '{series.name}:<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [
            {
                type: 'pie',
                name: '百分比',
                innerSize: '50%',
                data: [
                    ['互粉', data.fansScale.fans],
                    ['单向', data.fansScale.single]
        ]
        }
        ],
        credits: {
        enabled: false // 禁用版权信息
        },
        exporting: {
        enabled: false
        }
        });


});