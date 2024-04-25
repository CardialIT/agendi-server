-- CreateTable
CREATE TABLE "professionals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nameProfessional" TEXT NOT NULL,
    "profession" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Scheduling_adm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "clients" TEXT NOT NULL,
    "scheduling_day" TEXT NOT NULL,
    "available_times" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Scheduling" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "hour" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProfessionalToScheduling" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProfessionalToScheduling_A_fkey" FOREIGN KEY ("A") REFERENCES "professionals" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProfessionalToScheduling_B_fkey" FOREIGN KEY ("B") REFERENCES "Scheduling" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Scheduling_adm_name_key" ON "Scheduling_adm"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessionalToScheduling_AB_unique" ON "_ProfessionalToScheduling"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessionalToScheduling_B_index" ON "_ProfessionalToScheduling"("B");
