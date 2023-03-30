-- CreateTable
CREATE TABLE "UserModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorUrl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "phone" TEXT,
    "hashpassword" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "subscribers_count" INTEGER NOT NULL DEFAULT 0,
    "following_count" INTEGER NOT NULL DEFAULT 0,
    "LikeCount" INTEGER NOT NULL DEFAULT 0,
    "hisLikes" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Folower" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "folow" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Folower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Folower_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Music" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "music_url" TEXT NOT NULL,
    CONSTRAINT "Music_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FirstLevelCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SecondLevelCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "firstLevelId" TEXT NOT NULL,
    CONSTRAINT "SecondLevelCategory_firstLevelId_fkey" FOREIGN KEY ("firstLevelId") REFERENCES "FirstLevelCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Video" (
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL PRIMARY KEY,
    "secondCategoryId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "embed_link" TEXT NOT NULL,
    "embed_html" TEXT NOT NULL,
    "share_url" TEXT NOT NULL,
    "cover_image_url" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "musicId" TEXT NOT NULL,
    "share_count" INTEGER NOT NULL,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "comment_count" INTEGER NOT NULL DEFAULT 0,
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Video_secondCategoryId_fkey" FOREIGN KEY ("secondCategoryId") REFERENCES "SecondLevelCategory" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION,
    CONSTRAINT "Video_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TagOnVideo" (
    "videoId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    PRIMARY KEY ("tagId", "videoId"),
    CONSTRAINT "TagOnVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagOnVideo_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "pictures" TEXT,
    "comment" TEXT NOT NULL,
    "writtenById" TEXT NOT NULL,
    "modelDeviceId" TEXT NOT NULL,
    CONSTRAINT "Comment_writtenById_fkey" FOREIGN KEY ("writtenById") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "like" BOOLEAN NOT NULL,
    "likeById" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    CONSTRAINT "Like_likeById_fkey" FOREIGN KEY ("likeById") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Like_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "ReportOnVideo" (
    "videoId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,

    PRIMARY KEY ("videoId", "reportId"),
    CONSTRAINT "ReportOnVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReportOnVideo_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ReportVideo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportVideo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "message" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Folower_userId_key" ON "Folower"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Folower_authorId_key" ON "Folower"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Music_name_key" ON "Music"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Music_alias_key" ON "Music"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Music_music_url_key" ON "Music"("music_url");

-- CreateIndex
CREATE UNIQUE INDEX "SecondLevelCategory_name_key" ON "SecondLevelCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Like_likeById_key" ON "Like"("likeById");

-- CreateIndex
CREATE UNIQUE INDEX "Like_videoId_key" ON "Like"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
