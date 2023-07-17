import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { medicinalReminderValidationSchema } from 'validationSchema/medicinal-reminders';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.medicinal_reminder
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMedicinalReminderById();
    case 'PUT':
      return updateMedicinalReminderById();
    case 'DELETE':
      return deleteMedicinalReminderById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMedicinalReminderById() {
    const data = await prisma.medicinal_reminder.findFirst(convertQueryToPrismaUtil(req.query, 'medicinal_reminder'));
    return res.status(200).json(data);
  }

  async function updateMedicinalReminderById() {
    await medicinalReminderValidationSchema.validate(req.body);
    const data = await prisma.medicinal_reminder.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteMedicinalReminderById() {
    const data = await prisma.medicinal_reminder.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
