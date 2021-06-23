import {Request, Response} from 'express';
import createUser from './services/CreateUser';

//string, number, boolean, object,Array
//interfaces

export function helloworld(request: Request, response: Response) {
    const user = createUser({
        email: 'mateusp.1996@gmail.com',
        password: 'teste123',
        techs: [
            'Node',
            'ReactJS',
            'React Native',
            {title: 'Javascript', experience: 100},
        ]
    });

    return response.json({message: 'Hello World'});
}