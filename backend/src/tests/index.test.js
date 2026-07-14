import request from 'supertest'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import app from '../index'

vi.mock('@prisma/client', () => {
    const mockPrismaClient = {
        task: {
            findMany: vi.fn(),
            create: vi.fn(),
        },
    }
    return {
        PrismaClient: vi.fn(function () {
            return mockPrismaClient
        }),
    }
})

vi.mock('@prisma/adapter-pg', () => ({
    PrismaPg: vi.fn(),
}))

import { PrismaClient } from '@prisma/client'
const prismaMock = new PrismaClient()

describe('API de tareas', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('crea una tarea nueva', async () => {
        const tareaCreada = { id: 1, text: 'Escribir informe', completed: false }
        prismaMock.task.create.mockResolvedValue(tareaCreada)

        const res = await request(app)
            .post('/tasks')
            .send({ text: 'Escribir informe' })

        expect(res.status).toBe(200)
        expect(res.body.text).toBe('Escribir informe')
    })

    it('lista las tareas creadas', async () => {
        prismaMock.task.findMany.mockResolvedValue([
            { id: 1, text: 'Escribir informe', completed: false },
        ])

        const res = await request(app).get('/tasks')

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
    })

    // Estos dos tests exponen el bug
    it('rechaza una tarea con título vacío', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({ text: '' })

        expect(res.status).toBe(400)
        expect(prismaMock.task.create).not.toHaveBeenCalled()
    })

    it('rechaza una tarea con título de solo espacios en blanco', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({ text: '   ' })

        expect(res.status).toBe(400)
        expect(prismaMock.task.create).not.toHaveBeenCalled()
    })
})