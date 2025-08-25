-- CreateTable
CREATE TABLE "TeamsAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "tokenExpiry" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamsAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamsMeeting" (
    "id" TEXT NOT NULL,
    "teamsAccountId" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "subject" TEXT,
    "organizer" TEXT,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "joinUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamsMeeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingTranscript" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "transcriptId" TEXT NOT NULL,
    "content" TEXT,
    "language" TEXT,
    "createdDateTime" TIMESTAMP(3),
    "status" TEXT,
    "downloadUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeetingTranscript_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamsAccount_userId_email_key" ON "TeamsAccount"("userId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "TeamsMeeting_meetingId_key" ON "TeamsMeeting"("meetingId");

-- CreateIndex
CREATE UNIQUE INDEX "MeetingTranscript_transcriptId_key" ON "MeetingTranscript"("transcriptId");

-- AddForeignKey
ALTER TABLE "TeamsAccount" ADD CONSTRAINT "TeamsAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingTranscript" ADD CONSTRAINT "MeetingTranscript_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "TeamsMeeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
