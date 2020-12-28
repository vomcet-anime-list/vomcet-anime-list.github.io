

new gridjs.Grid({
    sort: true,
    search: true,
    pagination: false,
    columns: [
        { 
            id: 'image',
            name: 'Image',
            formatter: (cell) => gridjs.html(`<img class="max-h-20" src="${cell}">`),
            width: "20px"
        },
        { 
            id: 'name',
            name: 'Name',

        },
        { 
            id: 'rating',
            name: 'Rating',
        },
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
        table: ' antialiased font-sans font-bold text-lg text-gray-500',
        th : '',
        td : ' max-h-4',
        //thead : 'w-full',
        sort : 'box-border h-10 w-10 p-4 border-4',
        search : 'shadow',
      }
  }).render(document.getElementById("gridWrapper"));