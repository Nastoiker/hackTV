import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';

const port = parseInt(process.env.PORT, 10) || 3000;

const createNestApplication = async (req: NextApiRequest, res: NextApiResponse) => {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    req.res = res;
    req.next = next;
    next();
  });
  await app.init();
  return app;
};

const providers = [
  Providers.GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
];

const options = {
  providers,
  callbacks: {
    signIn: async (user, account, profile, req, res) => {
      const app: INestApplication = await createNestApplication(req, res);
      const authService = app.get('AuthService');
      await authService.signInWithGithub(user, account.provider);
      return true;
    },
    session: async (session, user, req) => {
      const app: INestApplication = await createNestApplication(req, null);
      const authService = app.get;
