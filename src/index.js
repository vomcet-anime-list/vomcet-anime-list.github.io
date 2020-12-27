

new gridjs.Grid({
    columns: ["Name", "Email", "Phone Number"],
    sort: true,
    search: true,
    pagination: true,
    columns: [
        { 
          name: 'image',
          width: '10%',
          formatter: (cell) => gridjs.html(`<img src="${cell}">`)
        },
        'name',
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
        th : 'border ',
        td : 'border',
        thead : 'w-full',
        search : 'border shadow md:w-64 rounded-lg m-2 p2',
        pagination : '-right-0 flex flex-col',
        paginationSummary : 'flex-initial -right-0',
        paginationButton : 'flex-initial -right-0',
      }
  }).render(document.getElementById("gridWrapper"));