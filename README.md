# Bazaar Internship Case Study
A scalable inventory tracking system designed for general stores, supporting real-time stock movement, centralized product cataloging, and store-specific data via a hybrid PostgreSQL and SQLite architecture. Built with future multi-store support, role-based authentication, and detailed stock logging.

**Note:** This project is part of a case study. All data used is dummy and for demonstration purposes only.

## Tech Stack
- **Backend**: Node.js, Express
- **Database**:
  - **Global Database**: PostgreSQL (hosted on **Supabase** for centralized product catalog and global logs)
  - **Local Databases**: SQLite (for store-specific data such as inventory, sales, and stock movements)
- **Authentication**: JWT-based authentication with role-based access (Global Admin/Store Admin)
- **API**: REST APIs for managing inventory, products, sales, and transactions.

## Introduction
This is an Inventory Management System designed to help businesses track and manage their product stock across multiple stores. The system enables central management of product data while allowing individual stores to handle their own stock levels, sales, and inventory updates. It provides real-time tracking of stock movements and sales for each store, making it easier to monitor inventory, reduce stockouts, and optimize stock levels.

The system includes a centralized catalog that ensures consistency across all stores, and store-specific databases for local operations. This setup ensures that each store can manage its inventory independently while still being able to aggregate and analyze data at the central level.

## Key Features:
- **Centralized product catalog** shared across all stores.
- **Store-specific stock management** with local databases for each store.
- **Real-time stock movements and sales tracking**.
- **Role-based authentication** (Global Admin for overall management, Store Admins for individual stores).
- **REST APIs** for interacting with the system programmatically.
  - **Filtering** by store, product, date range, etc.
  - **Reporting** capabilities for sales and stock analysis.
  - **APIs for transactions**, including sales, stock updates, and inventory adjustments.



