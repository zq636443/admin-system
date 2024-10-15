import { request } from '@umijs/max';

const login = async (body) => {
  return request(`/user-service/userManager/managerLogin`, {
    method: 'POST',
    params: body,
  });
};

const getMenuList = async () => {
  return request('/user-service/menu/user');
};

export { login, getMenuList };
