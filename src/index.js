const html = document.getElementsByTagName('body')[0];    
const ctxStatus = document.getElementById('statusChart');
//Chart.defaults.global.legend.display = false;
const style = getComputedStyle(document.body).getPropertyValue('bg-green-400');

//finished, watching, planned
let statusData = [0, 0, 0]
let xmlData


function toggleDarkMode() {
    if(html.classList.contains('dark')) {
        html.classList.remove('dark');
    } else {
        html.classList.add('dark');
    }
}

new gridjs.Grid({
    sort: true,
    search: false,
    pagination: {
        limit: 25
    },
    columns: [
        { 
            id: 'image',
            name: 'Image',
            formatter: (cell) => gridjs.html(`<img class="max-h-24" src="${cell}">`),
            //width: '150px',
            sort: {
                enabled: false
            }
        },
        { 
            id: 'name',
            name: 'Name',
            //width: '40%',
        },
        {
            id: 'rating',
            name: 'Rating',
            //width: '40px',
            sort: {
                compare: (c, d) => {
                    // const a = parseInt(c);
                    // const b = parseInt(d);
                  
                    if (parseInt(c) > parseInt(d)) {
                        return 1;
                    } else if (parseInt(d) > parseInt(c)) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            }
        },
        {
            id: 'status',
            name: 'status',
            //width: '30px',
            formatter: (cell, row) => {
                if(row.cells[3].data == "finished"){
                    return gridjs.h('a', {
                        className: 'py-2 mb-4 px-2 rounded-md text-white bg-green-400',
                    }, 'Finished');
                }else if(row.cells[3].data == "watching"){
                    return gridjs.h('a', {
                        className: 'py-2 mb-4 px-2 rounded-md text-white bg-blue-400',
                    }, 'Watching');
                }else if(row.cells[3].data == "planned"){
                    return gridjs.h('a', {
                        className: 'py-2 mb-4 px-2 rounded-md text-white bg-yellow-400',
                    }, 'Planned');
                }
            }
        }
    ],
    server: {
        url: 'src/anime.xml',
        handle: (res) => {
            return res.text().then(str => (new window.DOMParser()).parseFromString(str, "text/xml"));
        },
        then: data => {
            return Array.from(data.querySelectorAll('anime'))
            .map(row => [
                row.querySelector('image').innerHTML,
                row.querySelector('name').innerHTML,
                row.querySelector('rating').innerHTML,
                row.querySelector('status').innerHTML,
            ]);
        }
    },
    className: {
        container : 'dark:border-gray-900 shadown-2xl',
        table: 'antialiased font-sans font-bold text-lg text-gray-500 dark:text-white dark:bg-gray-500 dark:border-gray-900',
        th : 'dark:bg-gray-600 dark:text-white dark:border-gray-900 dark:hover:bg-gray-700',
        td : 'dark:bg-gray-700 dark:border-gray-900',
        thead : 'dark:bg-gray-500 dark:border-gray-900 ',
        tbody : 'dark:border-gray-900',
        //search : 'shadow',
        paginationSummary  : 'dark:text-white dark:border-gray-900',
        header : 'dark:border-gray-900',
        footer  : 'dark:bg-gray-700 dark:border-gray-900',
        paginationButton : "bg-gray-500"
    }
}).render(document.getElementById("gridWrapper"));

const statusChartConfig = {
    // labels: [
    //     'finished',
    //     'watching',
    //     'planned'
    // ],
    datasets: [{
        label: 'Status dataset',
        data: statusData,
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    }],

}

fetch('/src/anime.xml').then( bruh => {
    return bruh.text()
}).then(data => {
    xmlData = fuckXml(data)
    xmlArray = Array.from(xmlData.childNodes[0].querySelectorAll('anime'))
    console.log(xmlArray)
    for(i = 0; i < xmlArray.length; i++){
        
        if(xmlArray[i].querySelector('status').innerHTML == 'finished'){
            statusData[0]++
        }else if(xmlArray[i].querySelector('status').innerHTML == 'watching'){
            statusData[1]++
        }else{
            statusData[2]++
        }
    }
    console.log(statusData)
}).then( bruh =>{
    const myChart = new Chart(ctxStatus, {
        type: 'pie',
        data: statusChartConfig,
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
    setStatusNumbers()
})


//this is in browser so fuck you
const fuckXml = (theXmlShit) => {
    return ( new window.DOMParser() ).parseFromString(theXmlShit, "text/xml");
}

const setStatusNumbers = () => {
    document.getElementById('statusFinished').innerHTML = statusData[0]
    document.getElementById('statusWatching').innerHTML = statusData[1]
    document.getElementById('statusPlanned').innerHTML = statusData[2]
}