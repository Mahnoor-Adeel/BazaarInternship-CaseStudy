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

## 🚀 Getting Started

To get started with the Inventory System, follow the steps below:

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/Mahnoor-Adeel/Inventory-System.git
cd Inventory-System
```
### 2. Install Dependencies

Next, you need to install all the required dependencies. Run the following command to download all necessary packages:

```bash
npm install
```

### 3. View Global Database on Supabase
The global product catalog and inventory data are stored in a PostgreSQL database hosted on Supabase. To view and interact with the database, follow these steps:

1. Go to the Supabase Dashboard and log in.
2. Navigate to your project: https://supabase.com/dashboard/project/ywganhdenzexztzbpkqh

## 💡 Design Decisions
### Stage 1: Local Store Setup for Kiryana Shop
The inventory system uses a structured relational schema to manage product data, stock levels, and transaction history.
#### Database Schema 
This schema was originally designed for a single kiryana (general) store, ensuring efficient and clean handling of inventory operations. Here's a high-level overview of the core tables:
- **Products**: Stores general product information.
- **SKUs**: Represents specific product variants like size and color.
- **Suppliers**: Stores registered suppliers for store.
- **Inventory**: Tracks stock levels of SKUs.
- **Stock Logs**: Maintains a record of every stock change (e.g., sales, restocks).

> The schema ensures organized product tracking, variant-level control, and a full history of stock movements — making it perfect for small-scale yet structured inventory systems.





