# OVERVIEW
- project qr code ordering system for restaurant
- customer scan qr code on table to access menu, place order, pay online
- kitchen display system for restaurant staff to view incoming orders
- admin dashboard for restaurant to manage menu, view orders, sales analytics

# techstsck 
- nextjs(typescript) 16 + tailwindcss + lucide icons
- firebase auth, firestore, storage, hosting
- auth email/password, google


# FLOW 
## customer
1. customer scans qr code on table
2. qr code redirects to menu page with table id in url parameter
3. customer browses menu, adds items to cart
4. customer proceeds to checkout, enters contact info, pays online
## owner restaurant

## kitchen staff
1. kitchen staff logs into kitchen display system
2. views incoming orders in real-time
3. updates order status (preparing, ready, completed)
4. notifies customer when order is ready (optional)
## serv staff
1. serv staff logs into kitchen display system
2. views incoming orders in real-time
3. updates order status (serving, completed)
4. notifies customer when order is served (optional)
