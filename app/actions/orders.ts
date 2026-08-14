"use server";

import { db } from '@/lib/db';

export async function createServiceRequest(formData: {
  name: string;
  phone: string;
  location: string;
  serviceType: string;
}) {
  try {
    const request = await db.serviceRequest.create({
      data: {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        serviceType: formData.serviceType,
        status: 'PENDING',
      },
    });
    return { success: true, id: request.id };
  } catch (error: any) {
    console.error('Failed to create service request:', error);
    return { error: 'Failed to submit service request' };
  }
}

export async function updateRequestStatus(id: number, status: 'PENDING' | 'ASSIGNED' | 'COMPLETED', assignedTo?: string) {
  try {
    const request = await db.serviceRequest.update({
      where: { id },
      data: {
        status,
        assignedTo: assignedTo || null,
      },
    });
    return { success: true, request };
  } catch (error: any) {
    console.error('Failed to update request status:', error);
    return { error: 'Failed to update status' };
  }
}
