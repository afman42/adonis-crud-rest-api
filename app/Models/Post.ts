import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

enum statusPublished {
  AKTIF = 'aktif',
  T_AKTIF = 'tidak_aktif'
}

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public judul: string

  @column()
  public deskripsi: string

  @column()
  public status_published: statusPublished

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
