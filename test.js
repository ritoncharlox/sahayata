const token = {
  name: 'asdf',
  email: 'asdf@gmail.com',
  sub: '66a3b0d6a3e3bbc078926f62',
  user: {
    name: 'asdf',
    email: 'asdf@gmail.com',
    id: '66a3b0d6a3e3bbc078926f62',
    userName: 'asdf'
  },
  iat: 1722087345,
  exp: 1724679345,
  jti: '24073834-ee88-4bf1-85bd-2dcfb2a58907'
}

const user = {
  id: '66a3b0d6a3e3bbc078926f62',
  userName: 'asdf',
  name: 'asdf',
  email: 'asdf@gmail.com',
  number: null,
  location: null,
  password: '$2a$10$03L4/cycsVS8zUnAAkl82OPHAqOzGqe1YjiT1Fw5pAv9NS0E0mnmS',
  dateJoined: '2024-07-26T14:21:10.538Z',
  isUser: true,
  isAdmin: false,
  isFreelancer: false,
  isNumberVerified: false,
  isEmailVerified: false,
  avatar: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1722006576~exp=1722010176~hmac=fb89b58a9c2addd7f73cf0d9eb22d5fc84c1f5cb1b29f1cdf6b3df7c994da188&w=996',
  createdAt: '2024-07-26T14:21:10.540Z',
  updatedAt: '2024-07-27T08:43:02.248Z'
}

const newToken = {
  ...token,
  user : {
    id: user.id,
    name: user.name,
    userName: user.userName,
    email: user.email
  }
}

console.log(newToken);