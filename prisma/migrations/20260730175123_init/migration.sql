-- CreateTable
CREATE TABLE "SessionsGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "responsibleCpf" TEXT NOT NULL,
    "responsiblePhoneNumber" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "braceletId" TEXT NOT NULL,
    "checkoutDate" DATETIME,
    "checkinDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "total" DECIMAL NOT NULL DEFAULT 0,
    "sessionType" TEXT NOT NULL DEFAULT 'NORMAL',
    "sessionsGroupId" TEXT NOT NULL,
    CONSTRAINT "Session_sessionsGroupId_fkey" FOREIGN KEY ("sessionsGroupId") REFERENCES "SessionsGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MenuItems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "isAvaliable" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL,
    "sessionId" TEXT NOT NULL,
    CONSTRAINT "Orders_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "menuItemId" TEXT NOT NULL,
    "ordersId" TEXT NOT NULL,
    CONSTRAINT "OrderItems_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItems" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItems_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_braceletId_key" ON "Session"("braceletId") WHERE "status" = 'OPEN';
