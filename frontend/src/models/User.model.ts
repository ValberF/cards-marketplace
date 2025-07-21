import type { Card } from "./Card.model"

export interface User {
  id?: number
  name?: string
  email: string
  password?: string
  cards?: Card[]
}