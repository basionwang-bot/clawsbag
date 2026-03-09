-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "nickname" TEXT,
    "industry" TEXT,
    "avatar" TEXT,
    "bio" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SkillPack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "coverImage" TEXT,
    "fileUrl" TEXT,
    "problem" TEXT,
    "contents" TEXT,
    "instructions" TEXT,
    "targetUser" TEXT,
    "notForUser" TEXT,
    "demoVideo" TEXT,
    "installCount" INTEGER NOT NULL DEFAULT 0,
    "rating" REAL NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "SkillPack_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SkillTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tagName" TEXT NOT NULL,
    "skillPackId" TEXT NOT NULL,
    CONSTRAINT "SkillTag_skillPackId_fkey" FOREIGN KEY ("skillPackId") REFERENCES "SkillPack" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Installation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "skillPackId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'installed',
    "installedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Installation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Installation_skillPackId_fkey" FOREIGN KEY ("skillPackId") REFERENCES "SkillPack" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "metricLabel" TEXT,
    "metricValue" TEXT,
    "city" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Case_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CaseSkillPack" (
    "caseId" TEXT NOT NULL,
    "skillPackId" TEXT NOT NULL,

    PRIMARY KEY ("caseId", "skillPackId"),
    CONSTRAINT "CaseSkillPack_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CaseSkillPack_skillPackId_fkey" FOREIGN KEY ("skillPackId") REFERENCES "SkillPack" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL,
    "content" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "skillPackId" TEXT NOT NULL,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_skillPackId_fkey" FOREIGN KEY ("skillPackId") REFERENCES "SkillPack" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE INDEX "SkillTag_skillPackId_idx" ON "SkillTag"("skillPackId");

-- CreateIndex
CREATE UNIQUE INDEX "Installation_userId_skillPackId_key" ON "Installation"("userId", "skillPackId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_skillPackId_key" ON "Review"("userId", "skillPackId");
