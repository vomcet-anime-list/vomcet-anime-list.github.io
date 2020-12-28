

new gridjs.Grid({
    sort: true,
    search: true,
    pagination: true,
    columns: [
        { 
          name: 'image',
          width: '10%',
          className: 'text-lime-600',
          formatter: (cell) => gridjs.html(`<img src="${cell}">`)
        },
        { 
            name: 'name',
            className: 'text-lime-600',
            formatter: (cell) => gridjs.html(`<p class="text-green-600 dark:text-lime-400 text-sm sm:text-base lg:text-sm xl:text-base font-semibold ">${cell}</p>`)
          },
        'rating',
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
            ]);
        }
      },
      className: {
        table: 'table-auto border min-w-full ',
        th : 'border',
        td : 'border',
        thead : 'w-full',
        search : 'border shadow md:w-64 rounded-lg mb-2 p2',
        pagination : '-right-0 flex flex-col',
        paginationSummary : 'flex-initial -right-0',
        paginationButton : 'flex-initial -right-0',
      }
  }).render(document.getElementById("gridWrapper"));