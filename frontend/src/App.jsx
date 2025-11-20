// frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // سيتم إنشاؤه لاحقاً
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import AdminProductCreatePage from './pages/AdminProductCreatePage';
import Footer from './components/Footer'; // سيتم إنشاؤه لاحقاً
import RegisterPage from './pages/RegisterPage'
import AdminRoute from './components/AdminRoute'; // <--- استيراد المكون الجديد
import AdminUserListPage from './pages/AdminUserListPage'; // <--- استيراد الصفحة الجديدة
import AdminProductListPage from './pages/AdminProductListPage'; // <--- إدارة المنتجات
import AdminProductEditPage from './pages/AdminProductEditPage'; // <--- تعديل منتج
import ShippingPage from './pages/ShippingPage'; 
import PaymentPage from './pages/PaymentPage'; 
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage'; // <--- تأكد من استيراد المكون
import "./index.css";

function App() {
  return (
    <Router>
      <Header /> {/* شريط التنقل */}
      <main className='mt-16' >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* مسارات الطلب والدفع (يجب أن تكون محمية بـ 'protect' في المستقبل) */}
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
       
       {/* 🚨 المسار المفقود: صفحة عرض تفاصيل الطلب */}
          <Route path="/order/:id" element={<OrderPage />} />

{/* ------------------ مسارات الأدمين المحمية ------------------ */}
          {/* نستخدم Route واحد للأدمين ويلف جميع مسارات الأدمين الداخلية */}
          <Route path="" element={<AdminRoute />}> 
             {/* مسار إضافة المنتج، لا يمكن الوصول إليه إلا عبر AdminRoute */}
            <Route path="/admin/product/create" element={<AdminProductCreatePage />} />
          </Route>
              {/* 🚨 المسار الجديد لإدارة المستخدمين */}
            <Route path="/admin/users" element={<AdminUserListPage />} />

            {/* 🚨 مسارات إدارة المنتجات الجديدة */}
            <Route path="/admin/productlist" element={<AdminProductListPage />} />
            <Route path="/admin/product/:id/edit" element={<AdminProductEditPage />} />

            
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;