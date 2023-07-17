import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { doctorValidationSchema } from 'validationSchema/doctors';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.doctor
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDoctorById();
    case 'PUT':
      return updateDoctorById();
    case 'DELETE':
      return deleteDoctorById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDoctorById() {
    const data = await prisma.doctor.findFirst(convertQueryToPrismaUtil(req.query, 'doctor'));
    return res.status(200).json(data);
  }

  async function updateDoctorById() {
    await doctorValidationSchema.validate(req.body);
    const data = await prisma.doctor.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDoctorById() {
    const data = await prisma.doctor.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
