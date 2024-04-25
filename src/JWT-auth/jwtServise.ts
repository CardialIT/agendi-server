// /* eslint-disable */
// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { User } from './../users/entities/user.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class AuthService {
//   userRepository: any;
//   jwtService: any;
//   async validateUser(username: string): Promise<User | null> {
//     return await this.userRepository.findOne({ where: { username: username } });
//   }

//   async login(user: User) {
//     const payload = { username: user.username, sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }
