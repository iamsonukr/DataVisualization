import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ menu, setMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when window is resized to larger than mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className='navbar'>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <li><a href='#total-sales-over-time' onClick={() => { setMenu('total-sales-over-time'); setIsOpen(false); }} className={menu === 'total-sales-over-time' ? "active" : ""}>Total Sales Over Time</a></li>
        <li><a href='#sales-growth' onClick={() => { setMenu('sales-growth'); setIsOpen(false); }} className={menu === 'sales-growth' ? "active" : ""}>Sales Growth</a></li>
        <li><a href='#repeated-customers' onClick={() => { setMenu('repeated-customers'); setIsOpen(false); }} className={menu === 'repeated-customers' ? "active" : ""}>Customer Growth</a></li>
        <li><a href='#customer-growth' onClick={() => { setMenu('customer-growth'); setIsOpen(false); }} className={menu === 'customer-growth' ? "active" : ""}>Repeat Customers</a></li>
        <li><a href='#customer-lifetime-value' onClick={() => { setMenu('customer-lifetime-value'); setIsOpen(false); }} className={menu === 'customer-lifetime-value' ? "active" : ""}>Customer Lifetime Value</a></li>
        <li><a href='#customer-geography' onClick={() => { setMenu('customer-geography'); setIsOpen(false); }} className={menu === 'customer-geography' ? "active" : ""}>Customers Geography</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;