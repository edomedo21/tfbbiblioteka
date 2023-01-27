-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2023 at 06:18 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tfbbiblioteka`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `line1` varchar(255) DEFAULT NULL,
  `line2` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `pincode` int(6) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`) VALUES
(1, 'Elektrotehnički odsjek'),
(2, 'Građevinski odsjek'),
(3, 'Mašinski odsjek'),
(4, 'Tekstilni odsjek'),
(5, 'Drvnoindustrijski odsjek');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`) VALUES
(139, 39),
(140, 39),
(141, 39),
(142, 39),
(144, 39),
(145, 39),
(146, 39),
(143, 40),
(147, 40);

-- --------------------------------------------------------

--
-- Table structure for table `orders_details`
--

CREATE TABLE `orders_details` (
  `id` int(10) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(10) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders_details`
--

INSERT INTO `orders_details` (`id`, `order_id`, `product_id`, `quantity`) VALUES
(210, 139, 1, 1),
(211, 140, 1, 1),
(212, 140, 2, 1),
(213, 141, 1, 1),
(214, 142, 2, 1),
(215, 143, 4, 1),
(216, 144, 1, 1),
(217, 145, 2, 1),
(218, 146, 3, 1),
(219, 147, 12, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `images` text DEFAULT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `quantity` int(10) NOT NULL,
  `short_desc` varchar(255) NOT NULL,
  `cat_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `image`, `images`, `description`, `price`, `quantity`, `short_desc`, `cat_id`) VALUES
(1, 'MATLAB', 'https://www.linkpicture.com/q/largepreview-3.png', 'https://www.linkpicture.com/q/largepreview-3.png', 'Programski jezik za matematičke i tehničke proračune', 55, 29, 'EO', 1),
(2, 'Osnovi elektrotehnike', 'https://www.linkpicture.com/q/download-1_20.jfif', 'https://www.linkpicture.com/q/download-1_20.jfif', 'Knjiga za studente 1 godine elektrotehničkog odsjeka', 59.99, 47, 'EO', 1),
(3, 'Algoritmi u programiranju', 'https://www.linkpicture.com/q/chrome_DNeJNqtkJb.png', 'https://www.linkpicture.com/q/chrome_DNeJNqtkJb.png', 'Zbirka riješenih zadataka vezanih za matematičke i druge probleme', 39.99, 67, 'EO', 1),
(4, 'Osnovi elektrotehnike', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193841_553_65_1.jpg', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193841_553_65_1.jp', 'Zbirka zadataka', 250, 76, 'EO', 1),
(5, 'Arhitektura i organizacija računara', 'https://www.linkpicture.com/q/240550.jpg', 'https://www.linkpicture.com/q/240550.jpg', 'Prijevod petog izdanja', 240.99, 82, 'EO', 1),
(6, 'Konstruiranje mostova', 'https://www.linkpicture.com/q/download-3_5.jfif', 'https://www.linkpicture.com/q/download-3_5.jfif', 'Mostovi 2', 59.99, 4, 'GO', 2),
(7, 'Planiranje saobraćaja i saobraćajnica', 'https://www.linkpicture.com/q/go.jfif', 'https://www.linkpicture.com/q/go.jfif', 'Knjiga za studente Građevinskog odsjeka', 39.99, 95, 'GO', 2),
(8, 'Mehanika tla', 'https://www.linkpicture.com/q/mehanika-tla-obradovic-najdanovic-slika-10045549.jpg', 'https://www.linkpicture.com/q/mehanika-tla-obradovic-najdanovic-slika-10045549.jpg', 'Koristi se u inženjerskoj praksi', 250, 100, 'GO', 2),
(9, 'Kolovozne konstrukcije', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193844_789_22_1.jpg', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193844_789_22_1.jpg', 'Knjiga za studente Građevinskog odsjeka', 240.99, 100, 'GO', 2),
(10, 'Armirani beton 1', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193845_298_42_1.jpg', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193845_298_42_1.jpg', 'Knjiga za studente Građevinskog odsjeka', 59.99, 100, 'GO', 2),
(11, 'Elastostatika', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193852_231_31_1.jpg', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193852_231_31_1.jpg', 'Univerzitetska knjiga, PRVI DIO', 39.99, 100, 'MO', 3),
(12, 'Statika', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193851_705_4_1.jpg', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193851_705_4_1.jpg', 'Univerzitetska knjiga, Bihać, 2004.', 250, 54, 'MO', 4),
(13, 'Nove tehnologije u proizvodnim procesima razvoj i primjena', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193851_244_47_1.jpg', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193851_244_47_1.jpg', 'Mostar, 2014.', 240.99, 68, 'MO', 3),
(14, 'Materijali u mašinstvu', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193850_705_51_1.jpg', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193850_705_51_1.jpg', 'Knjiga za studente Mašinskog odsjeka', 59.99, 100, 'MO', 3),
(15, 'Mašinski elementi 1', 'https://www.linkpicture.com/q/mo.png', 'https://www.linkpicture.com/q/mo.png', 'Univerzitet Džemal Bijedić, Mašinski fakultet Mostar', 39.99, 100, 'MO', 3),
(16, 'Povijest, sociologija i teorija mode', 'https://www.linkpicture.com/q/IMG_0713-800x800.jpg', 'https://www.linkpicture.com/q/IMG_0713-800x800.jpg', 'Knjiga za studente Tekstilnog odsjeka', 250, 100, 'TO', 4),
(17, 'Dizajn i kriza', 'https://www.linkpicture.com/q/hosic-irfan-dizajn-kriza-design-and-crisis-slika-165425669.jpg', 'https://www.linkpicture.com/q/hosic-irfan-dizajn-kriza-design-and-crisis-slika-165425669.jpg', 'Knjiga za studente Tekstilnog odsjeka', 240.99, 100, 'TO', 4),
(18, 'Vrtoglavica u modi', 'https://www.linkpicture.com/q/zarko-paic-vrtoglavica-modi-prema-vizualnoj-semiotici-tijela-2007-slika-157872256.jpg', 'https://www.linkpicture.com/q/zarko-paic-vrtoglavica-modi-prema-vizualnoj-semiotici-tijela-2007-slika-157872256.jpg', 'Prema vizualnoj semiotici tijela, 2007', 59.99, 80, 'TO', 4),
(19, '#InFocus2015', 'https://www.linkpicture.com/q/59e8781ab00b98.99835686_IF1.jpg.crdownload', 'https://www.linkpicture.com/q/59e8781ab00b98.99835686_IF1.jpg.crdownload', 'Damir Design & Co', 39.99, 100, 'TO', 4),
(20, 'Odijevanje i moda u društvu i jeziku ', 'https://www.linkpicture.com/q/download_16.jfif', 'https://www.linkpicture.com/q/download_16.jfif', 'Knjiga za studente Tekstilnog odsjeka', 250, 100, 'TO', 4),
(21, 'Tehnologija proizvodnje namještaja', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193847_779_32.jpg', 'https://www.linkpicture.com/q/TapScanner-15-07-2022-08꞉49_20221229_193847_779_32.jpg', 'Univerzitetska knjiga, Bihać 2004.', 240.99, 99, 'DO', 5),
(22, 'Nekonvencionalni načini sušenja', 'https://www.linkpicture.com/q/lPC94o2524.png', 'https://www.linkpicture.com/q/lPC94o2524.png', 'Univerzitet u Bihaću, Tehnički fakultet', 59.99, 100, 'DO', 5),
(23, 'Biomasa kao gorivo', 'https://www.linkpicture.com/q/largepreview-1.png', 'https://www.linkpicture.com/q/largepreview-1.png', 'Univerzitet u Bihaću, Tehnički fakultet', 39.99, 100, 'DO', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fname` varchar(255) DEFAULT 'not set',
  `lname` varchar(255) DEFAULT 'not set',
  `age` int(10) DEFAULT 18,
  `role` int(10) DEFAULT 555,
  `photoUrl` text DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'local'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `fname`, `lname`, `age`, `role`, `photoUrl`, `type`) VALUES
(22, 'Amar', '$2a$12$vsY.zpat7tvePIZDJPYre.gCnnfpFSwucOWFwYg2Egr0HtgADTF4m', 'ami@gmail.com', 'Selim', 'Kasic', 23, 777, NULL, 'local'),
(24, 'Amar', '$2b$10$1FdiZnzt2Lm5b/dv6swDj.jjk/p5Ssm2pepAVuZJSehowESRx4H8i', 'hirkic.amir@gmail.com', 'Amir', 'Hirkic', 18, 777, NULL, 'local'),
(37, 'selim5', '$2b$10$FmLoppWW4gNFQRMqcgeAMuRcbboMItDgBHf3dINKetHBykaqT.K9G', 'amar.selim@gmail.com', 'Amar', 'Selimbegovic', 18, 555, NULL, 'local'),
(38, 'mujka', '$2b$10$xgJjmSlvHzz1nRsa4hUmIu9pUA6dSLaR5K.pQrjnFgSDfwaQXl14S', 'mujka.edin@gmail.com', 'Edin', 'Susi', 18, 555, NULL, 'local'),
(39, 'edomedo', '$2b$10$M9RW92J7VmHNblwGguJsvetsGFVAZEDDkixHOFUOhdoMrDKF3Ezfq', 'akmadzicedin@gmail.com', 'Edin', 'Akmadzic', 18, 777, 'https://i.pinimg.com/originals/dc/55/a0/dc55a0fec14d93d9cf6fa32c32f7c7f2.jpg', 'local'),
(40, 'alemalema', '$2b$10$JsG9lOwwDOkcauGg52/P4uiCkmq0mnnSjpSXlRolrZaEtD/YKNQUa', 'alemahusic@gmail.com', 'Alema', 'Husic', 18, 999, NULL, 'local'),
(41, 'Sead', '$2b$10$AlqXLPdO3hP518/yYUbR4ugAQWY2S7Fdotc1LO0.QcNMfrIcyI2RG', 'sead@gmail.com', 'Sead', 'Delalic', 70, 555, NULL, 'local'),
(42, 'ami5', '$2b$10$GGTR8vhUT5uoophjDyEP5OTL.YDkeU3upkKRTk/upyHBdOPD3vydG', 'amarkasic@gmail.com', 'Amar', 'Kasic', 18, 555, 'https://i.pinimg.com/originals/dc/55/a0/dc55a0fec14d93d9cf6fa32c32f7c7f2.jpg', 'local'),
(1077, 'edin', '$2b$10$0Kfrdiaz.pmtLNtgdhOg5OzYibYbLghCZyButRW9rjRR.soI9PSoW', 'edin.akmadzic@hotmail.com', 'Edin', 'Akmadzic', 24, 555, NULL, 'local');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_addresses_users1_idx` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_users1_idx` (`user_id`);

--
-- Indexes for table `orders_details`
--
ALTER TABLE `orders_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_has_products_products1_idx` (`product_id`),
  ADD KEY `fk_orders_has_products_orders1_idx` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`cat_id`);
ALTER TABLE `products` ADD FULLTEXT KEY `description` (`description`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT for table `orders_details`
--
ALTER TABLE `orders_details`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=220;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2212;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `fk_addresses_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders_details`
--
ALTER TABLE `orders_details`
  ADD CONSTRAINT `fk_orders_has_products_orders1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_orders_has_products_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
