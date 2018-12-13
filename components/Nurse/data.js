const initialData = { 
    tasks: {
        'task-1': { id: 'task-1', content: 'Shadid Haque', img: 'https://images.huffingtonpost.com/2015-09-01-1441099561-2313004-segelhowimetyourmother570x380-thumb.jpg' },
        'task-2': { id: 'task-2', content: 'Jon Doe', img: 'https://d2m3klzcmjgreb.cloudfront.net/wp-content/uploads/2014/07/ted_002.png'  },
        'task-3': { id: 'task-3', content: 'Rob Cool Kid', img: 'https://media.gq.com/photos/55828b3f1177d66d68d5287c/master/w_800/blogs-the-feed-how-i-met-your-mother-barney-stinson.jpg'  },
        'task-4': { id: 'task-4', content: 'Julia Afronski', img: 'https://i.pinimg.com/originals/07/35/47/0735473133ac31fd134172c9b504bae8.jpg'  }
    },
    columns: {
        'column-1': {
          id: 'column-1',
          title: 'Patients List',
          taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
        "column-2": {
            id: "column-2",
            title: "In Danger",
            taskIds: []
          },
        // "column-3": {
        //     id: "column-3",
        //     title: "Done",
        //     taskIds: []
        // },
    },

    // Facilitate reordering of the columns
    columnOrder: ["column-1", "column-2"]
    // columnOrder: ["column-1"]

}

export default initialData;