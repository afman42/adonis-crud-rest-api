import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Post from 'App/Models/Post'

enum statusPublished {
  AKTIF = 'aktif',
  T_AKTIF = 'tidak_aktif'
}

export default class PostSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Post.createMany([
      {
        judul: 'Ini Judul',
        deskripsi: 'Ini Deskripsi',
        status_published: statusPublished.AKTIF
      },
      {
        judul: 'Ini Judul 2',
        deskripsi: 'Ini Deskripsi 2',
        status_published: statusPublished.T_AKTIF
      },
    ])
  }
}
