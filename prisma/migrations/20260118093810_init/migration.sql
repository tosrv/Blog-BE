/*
  Warnings:

  - The primary key for the `PostCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `catefgoryId` on the `PostCategory` table. All the data in the column will be lost.
  - You are about to drop the column `postid` on the `PostCategory` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `PostCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `PostCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostCategory" DROP CONSTRAINT "PostCategory_catefgoryId_fkey";

-- DropForeignKey
ALTER TABLE "PostCategory" DROP CONSTRAINT "PostCategory_postid_fkey";

-- AlterTable
ALTER TABLE "PostCategory" DROP CONSTRAINT "PostCategory_pkey",
DROP COLUMN "catefgoryId",
DROP COLUMN "postid",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "postId" INTEGER NOT NULL,
ADD CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("postId", "categoryId");

-- AddForeignKey
ALTER TABLE "PostCategory" ADD CONSTRAINT "PostCategory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCategory" ADD CONSTRAINT "PostCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
