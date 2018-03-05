$(document).ready(function(){
    salaryHighCharts.yearSalary();
})

var parameter = {
    profession:['工業及服務業','工業','礦業及土石採取業','製造業','電力及燃氣供應業','用水供應及污染整治業','營造業','服務業','批發及零售業','運輸及倉儲業','住宿及餐飲業','資訊及通訊傳播業','金融及保險業','不動產業','專業科學及技術服務業','支援服務業','教育服務業','醫療保健服務業','藝術娛樂及休閒服務業','其他服務業'],
    //HighCharts config
    config:{
        chart:{
            type:'line'
        },
        title:{
            text:'各行各業薪資圖'
        },
        xAxis:{
            title:{
                text:'年份ˇ'
            }
        },
        yAxis:{
            title:{
                text:'薪資'
            }
        },
        plotOptions:{
            series:{
                label: {
                    connectorAllowed: false
                },
                pointStart:1980
            }
        },
        tooltip:{
            formatter:function(){
                return this.x + '年<br>' + this.series.name + '：' + this.y;
            }          
        },
        series:[]
    }
}
//Load Data
var getData = function(){
    var salary = new Array();    
    $.ajaxSettings.async = false;
    $.getJSON('./data.json',function(data){    
        var keys = Object.getOwnPropertyNames(data[0]);                
        for(var i=0;i<data.length; i++){
            if(data[i][keys[0]].indexOf('M') == -1){                         
                for(var j=1;j < keys.length; j++){                
                    if(i == 0){
                        salary[j-1] = new Array();
                    }
                    salary[i,j-1].push(parseInt(data[i][keys[j]]));
                }            
            }
        }
    })      
    return salary;
}
var salaryHighCharts = {
    //年薪
    yearSalary:function (){
        parameter.config.series = [];    
        var data = new Array();    
        data = getData();    
        for(i=0; i < parameter.profession.length;i++){
            var seriesOption = {
                name:parameter.profession[i],
                data:data[i]
            };    
            parameter.config.series.push(seriesOption);
        }                    
        Highcharts.chart('demo',parameter.config);
    },
    //年薪增長率
    yearGrowthRate:function(){
        parameter.config.series = [];
        var growthRate = new Array();
        var data = getData();
        for(i=0; i < data.length; i++){
            growthRate[i] = new Array();
            for(j=0 ;j < (data[i].length-1); j++){                                                                                                    
                growthRate[i][j] = parseFloat(((data[i][j+1] - data[i][j])*100 / data[i][j+1]).toFixed(3));
            }
        }
        for(i=0; i < parameter.profession.length;i++){
            var seriesOption = {
                name:parameter.profession[i],
                data:growthRate[i]
            }; 
            parameter.config.series.push(seriesOption);
        }            
        
        Highcharts.chart('demo',parameter.config);
    }
}
