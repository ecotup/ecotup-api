-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: 34.101.70.239
-- Generation Time: Dec 16, 2023 at 08:11 AM
-- Server version: 5.7.44-google-log
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ecotup`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_article`
--

CREATE TABLE `tbl_article` (
  `article_id` int(10) UNSIGNED NOT NULL,
  `article_image` varchar(255) DEFAULT NULL,
  `article_name` varchar(255) DEFAULT NULL,
  `article_author` varchar(255) DEFAULT NULL,
  `article_link` varchar(255) DEFAULT NULL,
  `article_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cluster`
--

CREATE TABLE `tbl_cluster` (
  `cluster_id` int(11) UNSIGNED NOT NULL,
  `cluster_name` varchar(255) NOT NULL,
  `cluster_region` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `driver_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_driver`
--

CREATE TABLE `tbl_driver` (
  `driver_id` int(10) UNSIGNED NOT NULL,
  `driver_name` varchar(255) NOT NULL,
  `driver_password` varchar(255) DEFAULT NULL,
  `driver_email` varchar(255) NOT NULL,
  `driver_phone` varchar(14) NOT NULL,
  `driver_longitude` double DEFAULT NULL,
  `driver_latitude` double DEFAULT NULL,
  `driver_type` varchar(255) NOT NULL,
  `driver_license` varchar(255) NOT NULL,
  `driver_profile` varchar(255) DEFAULT NULL,
  `driver_point` int(11) DEFAULT '0',
  `driver_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `driver_rating` float DEFAULT '5',
  `transaction_id` int(10) UNSIGNED DEFAULT NULL,
  `cluster_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reward`
--

CREATE TABLE `tbl_reward` (
  `reward_id` int(10) UNSIGNED NOT NULL,
  `reward_image` varchar(255) DEFAULT NULL,
  `reward_name` varchar(255) DEFAULT NULL,
  `reward_price` varchar(255) DEFAULT NULL,
  `reward_description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subscription`
--

CREATE TABLE `tbl_subscription` (
  `subscription_id` int(10) UNSIGNED NOT NULL,
  `subscription_status` varchar(255) DEFAULT NULL,
  `subscription_value` int(11) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction`
--

CREATE TABLE `tbl_transaction` (
  `transaction_id` int(10) UNSIGNED NOT NULL,
  `transaction_longitude_start` double NOT NULL,
  `transaction_latitude_start` double NOT NULL,
  `transaction_longitude_destination` double NOT NULL,
  `transaction_latitude_destination` double NOT NULL,
  `transaction_description` varchar(255) DEFAULT NULL,
  `transaction_total_payment` double NOT NULL,
  `transaction_total_weight` double NOT NULL,
  `transaction_total_point` int(11) DEFAULT NULL,
  `transaction_status` varchar(25) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `driver_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_phone` varchar(14) NOT NULL,
  `user_longitude` double DEFAULT NULL,
  `user_latitude` double DEFAULT NULL,
  `user_profile` varchar(255) DEFAULT NULL,
  `user_point` int(11) DEFAULT '0',
  `user_token` varchar(255) DEFAULT NULL,
  `user_subscription_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subscription_id` int(10) UNSIGNED DEFAULT '5',
  `transaction_id` int(10) UNSIGNED DEFAULT NULL,
  `cluster_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_article`
--
ALTER TABLE `tbl_article`
  ADD PRIMARY KEY (`article_id`);

--
-- Indexes for table `tbl_cluster`
--
ALTER TABLE `tbl_cluster`
  ADD PRIMARY KEY (`cluster_id`),
  ADD KEY `fk_cluster_users` (`user_id`),
  ADD KEY `fk_cluster_drivers` (`driver_id`);

--
-- Indexes for table `tbl_driver`
--
ALTER TABLE `tbl_driver`
  ADD PRIMARY KEY (`driver_id`),
  ADD UNIQUE KEY `tbl_driver_driver_email_unique` (`driver_email`),
  ADD KEY `fk_driver_transaction` (`transaction_id`),
  ADD KEY `fk_cluster_driver` (`cluster_id`);

--
-- Indexes for table `tbl_reward`
--
ALTER TABLE `tbl_reward`
  ADD PRIMARY KEY (`reward_id`);

--
-- Indexes for table `tbl_subscription`
--
ALTER TABLE `tbl_subscription`
  ADD PRIMARY KEY (`subscription_id`);

--
-- Indexes for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `fk_transaction_users` (`user_id`),
  ADD KEY `fk_transaction_driver` (`driver_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `tbl_user_user_email_unique` (`user_email`),
  ADD KEY `fk_subscription_users` (`subscription_id`),
  ADD KEY `fk_user_transaction` (`transaction_id`),
  ADD KEY `fk_user_clusters` (`cluster_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_article`
--
ALTER TABLE `tbl_article`
  MODIFY `article_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_cluster`
--
ALTER TABLE `tbl_cluster`
  MODIFY `cluster_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=420;
--
-- AUTO_INCREMENT for table `tbl_driver`
--
ALTER TABLE `tbl_driver`
  MODIFY `driver_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tbl_reward`
--
ALTER TABLE `tbl_reward`
  MODIFY `reward_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_subscription`
--
ALTER TABLE `tbl_subscription`
  MODIFY `subscription_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  MODIFY `transaction_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_cluster`
--
ALTER TABLE `tbl_cluster`
  ADD CONSTRAINT `fk_cluster_drivers` FOREIGN KEY (`driver_id`) REFERENCES `tbl_driver` (`driver_id`),
  ADD CONSTRAINT `fk_cluster_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`);

--
-- Constraints for table `tbl_driver`
--
ALTER TABLE `tbl_driver`
  ADD CONSTRAINT `fk_cluster_driver` FOREIGN KEY (`cluster_id`) REFERENCES `tbl_cluster` (`cluster_id`),
  ADD CONSTRAINT `fk_driver_transaction` FOREIGN KEY (`transaction_id`) REFERENCES `tbl_transaction` (`transaction_id`);

--
-- Constraints for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD CONSTRAINT `fk_transaction_driver` FOREIGN KEY (`driver_id`) REFERENCES `tbl_driver` (`driver_id`),
  ADD CONSTRAINT `fk_transaction_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`);

--
-- Constraints for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD CONSTRAINT `fk_subscription_users` FOREIGN KEY (`subscription_id`) REFERENCES `tbl_subscription` (`subscription_id`),
  ADD CONSTRAINT `fk_user_clusters` FOREIGN KEY (`cluster_id`) REFERENCES `tbl_cluster` (`cluster_id`),
  ADD CONSTRAINT `fk_user_transaction` FOREIGN KEY (`transaction_id`) REFERENCES `tbl_transaction` (`transaction_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
