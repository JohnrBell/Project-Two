# API Docs


### Categories

- GET /categories

  Response:
  ```[{id: 2, name: "enemies"}, {id: 4, name: "friends"}]```

- POST /categories

  Request body:
  ```{name: "enemies"}```

- GET /categories/:id

  Response: ```{id: 2, name: "enemies", contacts: [contact, contact, contact]}```

- PUT /categories/:id

  Request body: ```{name: "frenemies"}```

- DELETE /categories/:id


### Contacts

- GET /contacts

  Response: 
  ```json
  [
    {id: 2, category_id: 3, name: "sean", age: 28, address: "123 Main St.", phone_number: "555-555-1212", picture: "http://google.com/images/1.jpg", category_id: 5 }, 
    {id: 3, category_id: 4, name: "neel", age: 45, address: "455 Cedar St.", phone_number: "555-555-1212", picture: "http://google.com/images/2.jpg" }
  ]
  ```

- POST /contacts

  Request body: ```{category_id: 3, name: "sean", age: 28, address: "123 Main St.", phone_number: "555-555-1212", picture: "http://google.com/images/1.jpg" }```

- GET /contacts/:id

  Response: ```{id: 3, category_id: 4, name: "neel", age: 45, address: "455 Cedar St.", phone_number: "555-555-1212", picture: "http://google.com/images/2.jpg" }```

- PUT /contacts/:id

  Request body: ```{category_id: 3, name: "sean", age: 28, address: "123 Main St.", phone_number: "555-555-1212", picture: "http://google.com/images/1.jpg"}```

- DELETE /categories/:id
