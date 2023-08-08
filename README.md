# Paw & Play

## 簡介

這是一個使用 Vue + Node.js + MySQL 打造的購物網站，專案主題定位是新創寵物用品品牌，希望提供畫面簡潔清爽、操作直觀易用的體驗，目前主要提供瀏覽、篩選和排序商品、買家管理購物車內商品、商家管理上下架商品功能

| 測試帳號 | 帳號      | 密碼    |
| -------- | --------- | ------- |
| 買家     | buyer001  | titaner |
| 賣家     | seller001 | titaner |

![](https://res.cloudinary.com/dcgkzdjtr/image/upload/v1690294400/screencapture-ecommerce-website-tau-ten-vercel-app-2023-07-25-22_12_07_egdctd.png)

## 功能

**主頁面**

- 使用者可以瀏覽全部商品資料，每個商品會顯示名稱、單價和庫存
- 使用者可以點擊商品圖片瀏覽該項商品詳細資料
- 使用者可以使用分類、金額範圍或關鍵字搜尋相關商品
- 使用者可以選擇使用商品上市時間、金額高到低或低到高進行商品排序
- 使用者可以點擊登入按鈕進行買家或商家使用者登入或註冊為新的買家使用者
- 商家使用者登入後可以點擊登出按鈕旁的商家圖示進入商家頁面
- 買家使用者登入後可以點擊登出按鈕旁的購物車圖示進入購物車頁面
- 買家使用者可以點擊商品資料內的購物車圖示將商品加入至購物車

![](https://res.cloudinary.com/dcgkzdjtr/image/upload/v1690305905/screencapture-ecommerce-website-tau-ten-vercel-app-product-2568b3d5-f109-414a-9227-4a33bbd55625-2023-07-25-22_27_45_n2fz2m.png)
![](https://res.cloudinary.com/dcgkzdjtr/image/upload/v1690305796/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2_2023-07-26_010856_uvita2.jpg)

**購物車頁面**

- 買家使用者可以使用增加、減少按鈕或直接輸入來更改購物車內商品數量
- 買家使用者可以刪除購物車內的商品
- 買家使用者可以點擊結帳按鈕進行該次購物車內商品的結清

![](https://res.cloudinary.com/dcgkzdjtr/image/upload/v1690305796/screencapture-localhost-5173-cart-2023-07-26-01_20_27_qpcf1b.png)

**商家頁面**

- 商家使用者可以瀏覽目前上架、下架的商品清單
- 使用者可以點擊上下架按鈕使商品狀態改變
- 商家使用者可以新增上架商品
- 商家使用者可以更新上架商品資料
- 商家使用者可以刪除下架商品

![](https://res.cloudinary.com/dcgkzdjtr/image/upload/v1690305796/screencapture-localhost-5173-store-2023-07-26-01_19_49_h9wrmz.png)

## 開始使用

```
# 經由終端機 clone 或下載本專案至本地資料夾
$ git clone https://github.com/Noelle-KH/ecommerce-website.git

# 於終端機分別進入 frontend 和 backend 資料夾內進行安裝(以 frontend 為例)
$ cd frontend
$ npm install

# 於 frontend 和 backend 資料夾內各新增 .env 檔案並參照 .env.example 設置環境變數
$ touch .env

# 於 backend 內創建資料庫及種子資料
$ npx prisma migrate dev

# 分別於終端機啟動 frontend 和 backend
$ npm run dev

# 啟動成功 frontend 會看到 vite 啟動的 Local 網址，而 backend 則會看到以下訊息代表專案順利運行
$ Server running on 8000
```

## 開發工具

- Node.js v18.16.0
- Express
- MySQL
- Prisma
- Vue
- Vue Router
- Tailwind
- Pinia
- 其他工具及版本請詳見 frontend 和 backend 的 package.json
