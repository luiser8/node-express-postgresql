import bcrypt from 'bcryptjs';
import { sign, signrefresh } from '../helpers/jwt.js';
import Users from '../models/users.js';

export const getUsersAll = async() => {
    try {
        return await Users.findAll();
    } catch (error) {
        return error;
    }
};

export const getUserById = async(id) => {
    try{
        return await Users.findByPk(id);
    }catch(error){
        return error;
    }
};

export const postUser = async(req) => {
    try{
        const { roleid, firstname, lastname, email, username, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const accesstoken = await sign({'roleid': roleid, 'username': username});
        const refreshtoken = await signrefresh({'roleid': roleid, 'username': username});

        const user = await Users.create({
            roleid,
            firstname,
            lastname,
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
            accesstoken,
            refreshtoken
        });

        return await user.save();

    }catch(error){
        return error;
    }
};

export const putUser = async(req) => {
    try{
        const { id } = req.params;
        const { roleid, firstname, lastname, email, username, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const accesstoken = await sign({'roleid': roleid, 'username': username});
        const refreshtoken = await signrefresh({'roleid': roleid, 'username': username});

        const newUser = { roleid, firstname, lastname, email, username, password: encryptedPassword, accesstoken, refreshtoken };

        return await Users.update(newUser, { where: { id } });

    }catch(error){
        return error;
    }
};

export const loginUser = async(req) => {
    try{
        const { username, password } = req.body;

        const user = await Users.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {

            const accesstoken = await sign({'roleid': user.roleid, 'username': username});
            const refreshtoken = await signrefresh({'roleid': user.roleid, 'username': username});
            const newUserLogin = { accesstoken, refreshtoken };

            await Users.update(newUserLogin, { where: { id: user.id } });

            return {
                userId: user.id,
                roleId: user.roleid,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                status: user.status,
                accesstoken: user.accesstoken,
                refreshtoken: user.refreshtoken
            };
        }

        return "Invalid Credentials";

      } catch (error) {
        return error;
      }
}

export const loginRefreshUser = async (refreshtoken) => {
    try {
        const user = await Users.findOne({ where: { refreshtoken } });

        if (user !== null) {
            const accesstoken = await sign({ 'roleid': user.roleid, 'username': user.username });
            const newAccessToken = { accesstoken };

            await Users.update(newAccessToken, { where: { id: user.id } });
            return { accesstoken: user.accesstoken };
        }

        return "Invalid Refresh Token";

    } catch (error) {
        return error;
    }
}

export const delUser = async(id) => {
    try{
        return await Users.destroy({ where: { id } });
    }catch(error){
        return error;
    }
};
