import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'Mison',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '石明'
  }
];

const Users = [];

for (let i = 0; i < 31; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    email: Mock.Random.email(),
    salary: Mock.Random.string('number', 5),
    addr: Mock.mock('@county(true)'),
    value6:Mock.Random.datetime() 
  }));
}





export {  LoginUsers, Users}
