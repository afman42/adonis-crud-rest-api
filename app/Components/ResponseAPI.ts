import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


interface apiResponse  {
    code: number,
    respon: string,
    data: any,
    response?: HttpContextContract['response']
}

export default class ResponseAPI {

    Response({ code, respon, data, response }: Partial<apiResponse>) {
        let api: Partial<apiResponse> = {};
        api.code = code;
        api.respon = respon;
        if (data != null) {
            api.data = data;
        }else{
            api.data = null;
        }
        return response?.status(code as number).json(api);
    }

    ResponseAPI200({ respon, data, response }: Partial<apiResponse>) {
        return this.Response({ code: 200, respon, data, response });
    }

    ResponseAPI201({ respon, data, response }: Partial<apiResponse>) {
        return this.Response({ code: 201, respon, data, response });
    }

    ResponseAPI404({ respon, response }: Partial<apiResponse>) {
        return this.Response({ code: 404, respon, response });
    }
}