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
    onlineTime:Mock.Random.datetime() 
  }));
}

const Teachers = [];
for(let i = 0; i < 31; i++){
  Teachers.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    email: Mock.Random.email(),
    salary: Mock.Random.string('number', 5),
    addr: Mock.mock('@county(true)'),
    onlineTime:Mock.Random.datetime()
  }));
}

  const Agents = [];
  for(let i = 0; i < 31; i++){
    Agents.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        email: Mock.Random.email(),
        salary: Mock.Random.string('number', 5),
        addr: Mock.mock('@county(true)'),
        onlineTime:Mock.Random.datetime()
      }));
  }


  const Evaluation = [];
  for(let i = 0; i < 31; i++){
    Evaluation.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        email: Mock.Random.email(),
        salary: Mock.Random.string('number', 5),
        addr: Mock.mock('@county(true)'),
        onlineTime:Mock.Random.datetime()
      }));
  }

  const ClassMan = [];
  for(let i = 0; i < 31; i++){
    ClassMan.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        email: Mock.Random.email(),
        salary: Mock.Random.string('number', 5),
        addr: Mock.mock('@county(true)'),
        onlineTime:Mock.Random.datetime()
      }));
  }


  const EnglishClass = [];
  for(let i = 0; i < 31; i++){
    EnglishClass.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        email: Mock.Random.email(),
        salary: Mock.Random.string('number', 5),
        addr: Mock.mock('@county(true)'),
        onlineTime:Mock.Random.datetime()
      }));
  }

  const ChineseClass = [];
  for(let i = 0; i < 31; i++){
    ChineseClass.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        email: Mock.Random.email(),
        salary: Mock.Random.string('number', 5),
        addr: Mock.mock('@county(true)'),
        onlineTime:Mock.Random.datetime()
      }));
  }

  const StudentMan = [];
  for(let i = 0; i < 31; i++){
    StudentMan.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        email: Mock.Random.email(),
        salary: Mock.Random.string('number', 5),
        addr: Mock.mock('@county(true)'),
        onlineTime:Mock.Random.datetime()
      }));
  }

  const ParentMan = [];
  for(let i = 0; i < 31; i++){
    ParentMan.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        email: Mock.Random.email(),
        salary: Mock.Random.string('number', 5),
        addr: Mock.mock('@county(true)'),
        onlineTime:Mock.Random.datetime()
      }));
  }




export {  LoginUsers, 
          Users, 
          Teachers, 
          Agents, 
          Evaluation, 
          ClassMan, 
          EnglishClass, 
          ChineseClass, 
          StudentMan, 
          ParentMan 
        }
