/*
  Warnings:

  - You are about to drop the `_JobTypeToProfessional` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_JobTypeToProfessional";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_ProfessionalJobType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProfessionalJobType_A_fkey" FOREIGN KEY ("A") REFERENCES "JobType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProfessionalJobType_B_fkey" FOREIGN KEY ("B") REFERENCES "Professional" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessionalJobType_AB_unique" ON "_ProfessionalJobType"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessionalJobType_B_index" ON "_ProfessionalJobType"("B");
