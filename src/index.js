
const html = document.getElementsByTagName('body')[0];    

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
    pagination: true,
    columns: [
        { 
            id: 'image',
            name: 'Image',
            formatter: (cell) => gridjs.html(`<img class="max-h-20" src="${cell}">`),
            width: "30px",
            sort: {
                enabled: false
            }
        },
        { 
            id: 'name',
            name: 'Name',
        },
        {
            id: 'rating',
            name: 'Rating',
            width: "30px"
        },
        {
            id: 'status',
            name: 'status',
            formatter: (cell, row) => {
                if(row.cells[3].data == "finished"){
                    return gridjs.h('a', {
                        className: 'py-2 mb-4 px-4 rounded-md text-white bg-green-400',
                    }, 'Finished');
                }else if(row.cells[3].data == "watching"){
                    return gridjs.h('a', {
                        className: 'py-2 mb-4 px-4 rounded-md text-white bg-blue-400',
                    }, 'Watching');
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