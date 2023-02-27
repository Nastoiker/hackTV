-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Фев 26 2023 г., 22:20
-- Версия сервера: 8.0.24
-- Версия PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `hacktv`
--

-- --------------------------------------------------------

--
-- Структура таблицы `comment`
--

CREATE TABLE `comment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pictures` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `writtenById` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `modelDeviceId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `firstlevelcategory`
--

CREATE TABLE `firstlevelcategory` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alias` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `like`
--

CREATE TABLE `like` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `like` tinyint(1) NOT NULL,
  `likeById` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `videoId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `reportonvideo`
--

CREATE TABLE `reportonvideo` (
  `videoId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reportId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `reportvideo`
--

CREATE TABLE `reportvideo` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `secondlevelcategory`
--

CREATE TABLE `secondlevelcategory` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alias` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstLevelId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `tag`
--

CREATE TABLE `tag` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `tagonvideo`
--

CREATE TABLE `tagonvideo` (
  `videoId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tagId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `usermodel`
--

CREATE TABLE `usermodel` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashpassword` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `AccessToken` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `video`
--

CREATE TABLE `video` (
  `isActive` tinyint(1) NOT NULL,
  `updated_at` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secondCategoryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tagId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brandId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `embed_link` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `embed_html` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `share_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_image_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `VideoDescription` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `width` int NOT NULL,
  `height` int NOT NULL,
  `share_count` int NOT NULL,
  `view_count` int NOT NULL DEFAULT '0',
  `comment_count` int NOT NULL DEFAULT '0',
  `likesCount` int NOT NULL DEFAULT '0',
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Comment_writtenById_fkey` (`writtenById`);

--
-- Индексы таблицы `firstlevelcategory`
--
ALTER TABLE `firstlevelcategory`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `like`
--
ALTER TABLE `like`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Like_likeById_fkey` (`likeById`),
  ADD KEY `Like_videoId_fkey` (`videoId`);

--
-- Индексы таблицы `reportonvideo`
--
ALTER TABLE `reportonvideo`
  ADD PRIMARY KEY (`videoId`,`reportId`),
  ADD KEY `ReportOnVideo_reportId_fkey` (`reportId`);

--
-- Индексы таблицы `reportvideo`
--
ALTER TABLE `reportvideo`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `secondlevelcategory`
--
ALTER TABLE `secondlevelcategory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `SecondLevelCategory_name_key` (`name`),
  ADD KEY `SecondLevelCategory_firstLevelId_fkey` (`firstLevelId`);

--
-- Индексы таблицы `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Tag_name_key` (`name`);

--
-- Индексы таблицы `tagonvideo`
--
ALTER TABLE `tagonvideo`
  ADD PRIMARY KEY (`tagId`,`videoId`),
  ADD KEY `TagOnVideo_videoId_fkey` (`videoId`);

--
-- Индексы таблицы `usermodel`
--
ALTER TABLE `usermodel`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Video_secondCategoryId_fkey` (`secondCategoryId`),
  ADD KEY `Video_userId_fkey` (`userId`);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `Comment_writtenById_fkey` FOREIGN KEY (`writtenById`) REFERENCES `usermodel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `like`
--
ALTER TABLE `like`
  ADD CONSTRAINT `Like_likeById_fkey` FOREIGN KEY (`likeById`) REFERENCES `usermodel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `Like_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `video` (`id`) ON DELETE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `reportonvideo`
--
ALTER TABLE `reportonvideo`
  ADD CONSTRAINT `ReportOnVideo_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `reportvideo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `ReportOnVideo_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `video` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `secondlevelcategory`
--
ALTER TABLE `secondlevelcategory`
  ADD CONSTRAINT `SecondLevelCategory_firstLevelId_fkey` FOREIGN KEY (`firstLevelId`) REFERENCES `firstlevelcategory` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `tagonvideo`
--
ALTER TABLE `tagonvideo`
  ADD CONSTRAINT `TagOnVideo_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `TagOnVideo_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `video` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `video`
--
ALTER TABLE `video`
  ADD CONSTRAINT `Video_secondCategoryId_fkey` FOREIGN KEY (`secondCategoryId`) REFERENCES `secondlevelcategory` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `Video_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usermodel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
