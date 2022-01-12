import {Request, Response} from 'express'
import {container} from 'tsyringe'
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

import CreateUserService from '../../../services/CreateUserService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    console.log(request.file)
      return response.json({ok: true});

      // const updateUserAvatar = container.resolve(UpdateUserAvatarService);

      // const user = await updateUserAvatar.execute({
      //   user_id: request.user.id,
      //   avatarFilename: request.body.path,
      // });

      // return response.json(user);
  }
}
