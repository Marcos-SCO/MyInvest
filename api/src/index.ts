// To ignore a types lib you can use: @ts-ignore

import express from 'express';
import App from './app';

import config from './config';
const { port } = config;

const app = App();
app.listen(port);

// const db = Db();