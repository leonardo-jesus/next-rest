import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import * as Yup from 'yup';

import restView from '../views/rests_view';
import Rest from '../models/Rest';

export default {
  async index(req: Request, res: Response) {
    const restsRepository = getRepository(Rest);

    const rests = await restsRepository.find({
      relations: ['images']
    });

    return res.json(restView.renderMany(rests));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const restsRepository = getRepository(Rest);

    const rest = await restsRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return res.json(restView.render(rest));
  },

  async create(req: Request, res: Response) {
    const {
      name,
      longitude,
      latitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;
  
    const restsRepository = getRepository(Rest);

    const reqImages = req.files as Express.Multer.File[];
    const images = reqImages.map(image => {
      return { path: image.filename }
    });

    const data = {
      name,
      longitude,
      latitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });
  
    await schema.validate(data, {
      abortEarly: false,
    });

    const rest = restsRepository.create(data);
  
    await restsRepository.save(rest);
  
    return res.status(201).json(rest);
  }
};