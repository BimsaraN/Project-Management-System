-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2024 at 11:45 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `research_lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_groups`
--

CREATE TABLE `tb_groups` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `area` varchar(250) NOT NULL,
  `leader` int(11) NOT NULL,
  `member1` int(11) NOT NULL,
  `member2` int(11) NOT NULL,
  `member3` int(11) NOT NULL,
  `supervisor` int(11) NOT NULL,
  `co_supervisor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_marks`
--

CREATE TABLE `tb_marks` (
  `id` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `subject` varchar(250) NOT NULL,
  `leaderMarks1` double NOT NULL,
  `member1Marks1` double NOT NULL,
  `member2Marks1` double NOT NULL,
  `member3Marks1` double NOT NULL,
  `leaderMarks2` double NOT NULL,
  `member1Marks2` double NOT NULL,
  `member2Marks2` double NOT NULL,
  `member3Marks2` double NOT NULL,
  `leaderMarks3` double NOT NULL,
  `member1Marks3` double NOT NULL,
  `member2Marks3` double NOT NULL,
  `member3Marks3` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_presentation`
--

CREATE TABLE `tb_presentation` (
  `id` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `presentationDoc` varchar(250) NOT NULL,
  `additionalDetails` varchar(250) NOT NULL,
  `noteText` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_research_paper`
--

CREATE TABLE `tb_research_paper` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `journal` varchar(250) NOT NULL,
  `issn_number` varchar(250) NOT NULL,
  `h_index` varchar(250) NOT NULL,
  `link` varchar(1000) NOT NULL,
  `paid` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_schedule`
--

CREATE TABLE `tb_schedule` (
  `id` int(11) NOT NULL,
  `date` varchar(250) NOT NULL,
  `time` varchar(250) NOT NULL,
  `presentation` varchar(250) NOT NULL,
  `examiner1` int(11) NOT NULL,
  `examiner2` int(11) NOT NULL,
  `examiner3` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_topic`
--

CREATE TABLE `tb_topic` (
  `id` int(11) NOT NULL,
  `topic` varchar(250) NOT NULL,
  `supervisor` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `category` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `regNum` varchar(250) NOT NULL,
  `batch` varchar(250) NOT NULL,
  `specialization` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `privilege` varchar(250) NOT NULL,
  `access` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_groups`
--
ALTER TABLE `tb_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_marks`
--
ALTER TABLE `tb_marks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_presentation`
--
ALTER TABLE `tb_presentation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_research_paper`
--
ALTER TABLE `tb_research_paper`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_schedule`
--
ALTER TABLE `tb_schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_topic`
--
ALTER TABLE `tb_topic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_groups`
--
ALTER TABLE `tb_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_marks`
--
ALTER TABLE `tb_marks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_presentation`
--
ALTER TABLE `tb_presentation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_research_paper`
--
ALTER TABLE `tb_research_paper`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_schedule`
--
ALTER TABLE `tb_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_topic`
--
ALTER TABLE `tb_topic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
