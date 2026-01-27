import React from 'react';
import './App.scss'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"
import Navbar from './componat/Navbar/Navbar';
import Home from './page/Home/Home.js';
import Footer from './componat/footer/Footer.js';
import Nows from './page/nows/nows.js';
import Aside from "./componat/aside/Aside.js"
import AboutMessage from './page/message/aboutMessage.js';
import Messages from './page/message/message.js';

import Login from './page/auth/login.js';
import Register from './page/auth/Register.js';
import Reast from './page/auth/Reast.js';
import ReastPassword from './page/auth/reastpassword.js';
// // start about to Store 
import About from './page/about/About';
import TheAbout from './componat/aboutStore/About.js';
import Dotoget from './componat/aboutStore/Dotoget.js';
// End about to Store 
// // start Account User 
// import AboutAccount from './page/account/aboutAccount.js';
// import UserOrder from './page/account/UserOrder.js';
// import SingleOrder from './page/account/singleorder.js';
// import UserMony from './page/account/UserMony.js';
// import Detail from './page/account/Detail.js';
// import UserIntroduction from './page/account/userintroduction.js';
// // End Account User 

// // Start product 
// // Start product 
// import Products from './page/products/Products.js';
// import Orders from './page/orders/orders.js';
// // End product 
// // Start cart 
// import AddCarde from './componat/carts/addcards.js';
// import AddStock from './componat/carts/addstock.js';
// import AddSelling from './componat/carts/addselling.js';
// import AddBayId from './componat/carts/addbayid.js';
// import AddBayAccout from './componat/carts/addbayaccount.js';
import Notfound from './componat/notfound/notfound.js';
// // End cart 
// // start admin 
// import Admin from './page/admin/admin.js';
// import AddProducts from './page/admin/Adde.js';
// import AdminMessages from './page/admin/Messageed.js';
// import Discount from './page/admin/discount.js';

// import Images from './page/admin/images.js'
// import AdminOrders from './page/admin/orders.js'
// import Users from './page/admin/users.js';
// import SingleOrderAdmin from './page/admin/singleorder.js'
// import SingleUser from './page/admin/singleuser.js';
// import AddAbout from './componat/carts/about';
// import Dealings from './page/admin/dealings.js';
// End admin 
const App = () => {

  const Layout = () =>{

    return(
      <div className="app">
        <Navbar />
        <Aside />
        <div className='content'>
        <Outlet />
        </div>
        <Footer  />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
      {
        path: "/",
        element: <Home />
      },
      // {
      //   path: "/Orders",
      //   element: <Orders />
      // },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/reast",
        element: <Reast />
      },
      {
        path: "/reast-password/:token",
        element: <ReastPassword />
      },
      {
        path: "/nows",
        element: <Nows />
      },
      // {
      //   path: "/message/:id",
      //   element: <Messages />
      // },
      {
        path: "/:notFound",
        element: <Notfound />
      },
      {
        path: "/:notFound/:not",
        element: <Notfound />
      },
      {
        path: "/about",
        element: <About />,
        children: [
          {
            path: "messages",
            element: <AboutMessage />
          },
          {
            path: "",
              element: <TheAbout />
            },
             {
                path: ":notFound",
                element: <Notfound />
              },
            {
              path: "messages",
              element: <Messages />
            },
            {
              path: "do-to-get",
              element: <Dotoget />
            },
          ]
      },
      // {
      //   path: "/account",
      //   element: <AboutAccount />,
      //   children: [
      //     {
      //       path: "",
      //       element: <UserIntroduction />
      //     },
      //      {
      //         path: ":notFound",
      //         element: <Notfound />
      //       },
      //     {
      //       path: "user-order",
      //       element: <UserOrder />
      //     },
      //     {
      //       path: "user-mony",
      //       element: <UserMony />
      //     },
      //     {
      //       path: 'detail',
      //       element: <Detail/>
      //     }, 
      //     {
      //       path: "single-order/:id",
      //       element: <SingleOrder />
      //     }
          
      //   ]
      // },
      // {
      //   path: "/home/product/:item",
      //   element: <Products />,
      //   children: [
      //     {
      //       path: "",
      //       element: <AddAbout />
      //     },
      //      {
      //         path: ":notFound",
      //         element: <Notfound />
      //       },
      //     {
      //       path: "cards/:title",
      //       element: <AddCarde />
      //     },
      //     {
      //       path: "bayid/:title",
      //       element: <AddBayId />
      //     },
      //     {
      //       path: "bayaccount/:title",
      //       element: <AddBayAccout />
      //     },
      //     {
      //       path: "stock/:title",
      //       element: <AddStock />
      //     },
      //     {
      //       path: "selling/:title",
      //       element: <AddSelling />
      //     },
      //   ]
      // },
      // {
      //   path: "/admin",
      //   element: <Admin />,
      //   children: [
      //     {
      //       path: "",
      //       element: <Notfound />
      //     },
      //      {
      //         path: ":notFound",
      //         element: <Notfound />
      //       },
      //     {
      //       path: "messages",
      //       element: <AdminMessages />
      //     },
      //     {
      //       path: "orders",
      //       element: <AdminOrders />
      //     },
      //     {
      //       path: "discount",
      //       element: <Discount />
      //     },
      //     {
      //       path: "images",
      //       element: <Images />
      //     },
      //     {
      //       path: "add-products",
      //       element: <AddProducts />
      //     },
      //     {
      //       path: "users",
      //       element: <Users />
      //     },
      //     {
      //       path: "dealings",
      //       element: <Dealings />
      //     },
      //     {
      //       path: "single-order/:id",
      //       element: <SingleOrderAdmin />
      //     },
      //     {
      //       path: "single-user/:token",
      //       element: <SingleUser />
      //     },
          
      //   ]
      // },
      ]
    }
  ])

  return (
      <RouterProvider router={router} />
  )
}

export default App;