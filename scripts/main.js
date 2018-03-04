
//HighCharts config
var config = {
    chart:{
        type:'line'
    },
    title:{
        text:'各行各業薪資成長圖'
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
    series:[]
};

//Load Data
$.getJSON('./data.json',function(data){    
    var keys = Object.getOwnPropertyNames(data[0]);
    var profession = ['工業及服務業','工業','礦業及土石採取業','製造業','電力及燃氣供應業','用水供應及污染整治業','營造業','服務業','批發及零售業','運輸及倉儲業','住宿及餐飲業','資訊及通訊傳播業','金融及保險業','不動產業','專業科學及技術服務業','支援服務業','教育服務業','醫療保健服務業','藝術娛樂及休閒服務業','其他服務業']
    var salary = new Array();
    var growthRate = new Array();
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
    
    for(i=0; i < profession.length;i++){
        var seriesOption = {
            name:profession[i],
            data:salary[i]
        };
        config.series.push(seriesOption);
    }

    for(i=0; i < salary.length; i++){
        for(j=0 ;j < (salary[i].length-1); j++){
            growthRate[j] = new Array();
            growthRate[i,j].push((parseInt(salary[i][j+1] - salary[i][j])*100 / salary[i][j+1]).toFixed(3));
        }
    }
    
    Highcharts.chart('demo',config);
})