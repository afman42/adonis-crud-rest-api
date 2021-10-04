import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ResponseAPI from 'App/Components/ResponseAPI';
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator';


export default class PostsController extends ResponseAPI {

    validasiSchema: any;
    validasiMessage: any;

    constructor(){
        super();
        this.validasiSchema = new CreatePostValidator().schema;
        this.validasiMessage = new CreatePostValidator().messages;
    }

    async index({ response } : HttpContextContract) {
        const model = await Post.all();
        return this.ResponseAPI200({
            respon: 'Berhasil',
            data: model,
            response
        });
    }

    async createPost( { response, request }: HttpContextContract){

        const payloadData = await request.validate({
            schema: this.validasiSchema,
            messages: this.validasiMessage,
        })

        const simpan = await Post.create(payloadData);

        if (simpan) {
            return this.ResponseAPI201({
                respon: 'Berhasil Di Tambah',
                data: simpan,
                response
            });
        }else{
            return this.ResponseAPI404({
                respon: 'Gagal Di Tambah',
                response
            });
        }
    }

    async editPost({ response, params }: HttpContextContract){
        const { id } = params;
        const model = await Post.find(id);
        if (model) {
            return this.ResponseAPI200({
                respon: 'Berhasil Di Temukan',
                data: model,
                response
            });
        }else{
            return this.ResponseAPI404({
                respon: 'Gagal Di Temukan',
                response
            });
        }
    }

    async updatePost( { response, request, params }: HttpContextContract){

        const payloadData = await request.validate({
            schema: this.validasiSchema,
            messages: this.validasiMessage,
        })

        const { id } = params;

        const model = await Post.findOrFail(id);
        model.judul = payloadData.judul;
        model.deskripsi = payloadData.deskripsi;
        model.status_published = payloadData.status_published;

        const simpan = await model.save()

        if (simpan) {
            return this.ResponseAPI200({
                respon: 'Berhasil Di Update',
                data: simpan,
                response
            });
        }else{
            return this.ResponseAPI404({
                respon: 'Gagal Di Update',
                response
            });
        }
    }

    async deletePost( { params,response}: HttpContextContract){
        const { id } = params;
        const model = await Post.find(id);
        if (model) {
            await model?.delete();
            return this.ResponseAPI200({
                respon: 'Berhasil Di Hapus',
                data: null,
                response
            });
        }else{
            return this.ResponseAPI404({
                respon: 'Gagal Di Temukan',
                response
            });
        }
    }
}
