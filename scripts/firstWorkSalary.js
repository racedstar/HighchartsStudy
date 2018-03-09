$(document).ready(function(){
    var rawData = [];
    var pro
    var config = {
        chart: {
            type: 'column'
        },
        title: {
            text: '2015各職業初任年薪'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {
                text: '職業'
            },
            type: 'category'
        },
        yAxis: {
            title: {
                text: '2015年薪'
            }
        },
        series: [{
            data: []
        }]
    }
    rawData = getData(2);
    setData(rawData, config);
    $('#btnFrequent').click(function(){
        rawData = getData(2);
        setData(rawData, config);
    })
    $('#btnSS').click(function(){
        rawData = getData(4);
        setData(rawData, config);
    })
    $('#btnHS').click(function(){
        rawData = getData(6);
        setData(rawData, config);
    });
    $('#btnspecialist').click(function(){
        rawData = getData(8);
        setData(rawData, config);
    });
    $('#btnuniversity').click(function(){
        rawData = getData(10);
        setData(rawData, config);
    });
    $('#btnGS').click(function(){
        rawData = getData(12);
        setData(rawData, config);
    });        
})

var setData = function(rawData, config){
    config.subtitle.text = rawData[0];
    config.series[0].data = rawData[1];
    slarayCharts(config);
}

//type(經常性薪資 = 2, 中學 = 4, 高中 = 6, 專科 = 8, 大學 = 10 研究所 = 12)
var getData = function(type){
    $.ajaxSettings.async = false;
    var rawData = new Array();
    rawData[0] = '';
    rawData[1] = new Array();
    $.getJSON('./A17000000J-020066-mAH.json', function(data){
        var keys = Object.getOwnPropertyNames(data[0]);
        for(var i = 0; i < data.length; i++){
            if(data[i][keys[1]].indexOf('-') >= 0)
            {
                continue;
            }

            var series = {
                name: data[i][keys[1]],                
                y: parseInt(data[i][keys[type]])
            };
            rawData[0] = keys[type];
            rawData[1].push(series);
        }        
    })    
    return rawData;
}

//繪圖用
var slarayCharts = function(config){
    Highcharts.chart('demo', config);
}