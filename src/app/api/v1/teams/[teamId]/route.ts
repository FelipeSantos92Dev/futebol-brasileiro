import { NextResponse } from 'next/server'
import { addHours } from 'date-fns'

import prisma from '@/lib/prisma'

export async function PATCH(req: Request, { params }: { params: { teamId: string } }) {
  try {
    const body = await req.json()

    const { name } = body

    if (!name) {
      return new NextResponse('Parâmetros incorretos', { status: 400 })
    }

    if (!params.teamId) {
      return new NextResponse('Id do time obrigatório', { status: 400 })
    }

    const teamExists = await prisma.team.findUnique({
      where: {
        id: params.teamId
      }
    })

    if (!teamExists) {
      return new NextResponse('Time não encontrado', { status: 404 })
    }

    const team = await prisma.team.update({
      where: {
        id: params.teamId
      },
      data: {
        name,
        updatedAt: addHours(new Date(), -3)
      }
    })

    return NextResponse.json(team)
  } catch (error) {
    console.log('[TEAM_PATCH]', error)
    return new NextResponse('Algo deu errado', { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { teamId: string } }) {
  try {
    if (!params.teamId) {
      return new NextResponse('Id do time obrigatório', { status: 400 })
    }

    const teamExists = await prisma.team.findUnique({
      where: {
        id: params.teamId
      }
    })

    if (!teamExists) {
      return new NextResponse('Time não encontrado', { status: 404 })
    }

    const team = await prisma.team.delete({
      where: {
        id: params.teamId
      }
    })

    return NextResponse.json(team)
  } catch (error) {
    console.log('[TEAM_DELETE]', error)
    return new NextResponse('Algo deu errado', { status: 500 })
  }
}
