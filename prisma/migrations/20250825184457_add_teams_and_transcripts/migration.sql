/*
  Warnings:

  - You are about to drop the column `createdDateTime` on the `MeetingTranscript` table. All the data in the column will be lost.
  - You are about to drop the column `downloadUrl` on the `MeetingTranscript` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `MeetingTranscript` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `MeetingTranscript` table. All the data in the column will be lost.
  - You are about to drop the column `joinUrl` on the `TeamsMeeting` table. All the data in the column will be lost.
  - You are about to drop the column `organizer` on the `TeamsMeeting` table. All the data in the column will be lost.
  - You are about to drop the column `teamsAccountId` on the `TeamsMeeting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[meetingId,transcriptId]` on the table `MeetingTranscript` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizerId` to the `MeetingTranscript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `MeetingTranscript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerId` to the `TeamsMeeting` table without a default value. This is not possible if the table is not empty.
  - Made the column `startTime` on table `TeamsMeeting` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MeetingTranscript" DROP CONSTRAINT "MeetingTranscript_meetingId_fkey";

-- AlterTable
ALTER TABLE "MeetingTranscript" DROP COLUMN "createdDateTime",
DROP COLUMN "downloadUrl",
DROP COLUMN "language",
DROP COLUMN "status",
ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "organizerId" TEXT NOT NULL,
ADD COLUMN     "participants" JSONB,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subject" TEXT;

-- AlterTable
ALTER TABLE "TeamsMeeting" DROP COLUMN "joinUrl",
DROP COLUMN "organizer",
DROP COLUMN "teamsAccountId",
ADD COLUMN     "joinWebUrl" TEXT,
ADD COLUMN     "organizerId" TEXT NOT NULL,
ADD COLUMN     "participants" JSONB,
ALTER COLUMN "startTime" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MeetingTranscript_meetingId_transcriptId_key" ON "MeetingTranscript"("meetingId", "transcriptId");

-- AddForeignKey
ALTER TABLE "MeetingTranscript" ADD CONSTRAINT "MeetingTranscript_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "TeamsMeeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
