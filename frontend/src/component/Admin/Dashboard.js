import React, { Fragment, useEffect, useState } from 'react'
import Slider from "./Slider.js"
import { Typography } from "@material-ui/core";
import "./dashboard.css"
import { Link } from 'react-router-dom';
import { Doughnut, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import {  getAdminProduct } from '../../actions/productAction';
const Dashboard = () => {
    let outOfStock = 0;
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);

  {products &&
    products.forEach((item) => {
      if (item.stock == 0) {
        outOfStock += 1;
      }
    });}

    useEffect(() => {
        dispatch(getAdminProduct());
        // dispatch(getAllOrders()); 
      }, [dispatch]);
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            borderColor: 'rgb(75, 192, 192)',
            data: [0,5200],
          },
        ],
      };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
            // data: [2, 11],
          },
        ],
      };
    return (
        <div className="dashboard">
      <Slider />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{56000}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              {/* <p>{orders && orders.length}</p> */}
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              {/* <p>{users && users.length}</p> */}
              <p>{76}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
    )
}

export default Dashboard