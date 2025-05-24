-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'upi_transfer';

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "receiverUpiId" TEXT,
ADD COLUMN     "senderUpiId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "upiId" DROP DEFAULT,
ALTER COLUMN "username" DROP DEFAULT;
