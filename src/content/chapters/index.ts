import type { Chapter } from '../types';
import { ch01 } from './ch01-breakers';
import { ch02 } from './ch02-queen';
import { ch03 } from './ch03-chambers';
import { ch04 } from './ch04-principle';
import { ch05 } from './ch05-machines';
import { ch06 } from './ch06-shannon';
import { ch07 } from './ch07-keys';
import { ch08 } from './ch08-cryptowars';
import { ch09 } from './ch09-tls';
import { ch10 } from './ch10-leaks';
import { ch11 } from './ch11-weapon';
import { ch12 } from './ch12-quantum';
import { epilogue } from './epilogue';

export const CHAPTERS: Chapter[] = [
  ch01,
  ch02,
  ch03,
  ch04,
  ch05,
  ch06,
  ch07,
  ch08,
  ch09,
  ch10,
  ch11,
  ch12,
  epilogue,
];
