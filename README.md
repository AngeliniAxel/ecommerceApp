# A simple e-commerce web-app using the PERN stack (Postgres, Express, React, Node.js)

Recent update: As heroku is no longer available (for free :sweat_smile:), I've made changes to deploy the application locally, and I'll record a video soon to demonstrate the live version :grin:

## Live version example

- This is the initial view of the app

![full view of the app](/img/full-view.jpg)


- Responsive design that adapts to every screen

![responsive design](/img/responsive.jpg)


- You can filter products, updating redux state

![filter products](/img/filter.jpg)


- You can enter to a single product view and, if you are logged in (SSO with Google, note that it takes your profile picture and your name), you can add products to your cart.

![single product view](/img/single-product.jpg)


- You can add or remove products from your cart, and it is updated in the database

![cart view](/img/cart.jpg)


### This project is developed as an assignment for the Codecademy Full Stack Engineering Path.



### Folder structure

 - Client
    - src
        - app
            - components
        - images
        - slices
- Config (for passport)
- database
- routes


---

### Routes

- Auth routes
    - /auth/google - GET 
        - used to make  autentication via Google using passport.js
    - /auth/login/success - GET 
        - when login is successful, retrieve user info
    - /auth/login/failed - GET 
        - when login failed, send failed msg
    - /auth/logout - GET 
        - destroys cookie session and redirects to client 
    - /auth/google/callback - GET
        - redirect to client after successfully login via Google
        

- Cart routes 
    - /api/cart/:userId - GET
        - Uses user Id to retrieve his cart from the database
        
- Cart-products routes
    - /api/cart_products/:cartid - GET
        - Having a cartid it retrieves his products
    - /api/cart_products/:cartid - POST
        - To put a product in the cart or update his quantity if it already exists
    - /api/cart_products/:productId - DELETE
        - deletes a product from the cart
   
---
   
### Database

Postgres database living inside Heroku

![database squema squema](/database/squema.jpeg)
