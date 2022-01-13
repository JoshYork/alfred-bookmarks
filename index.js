import alfy from 'alfy'
import fs from 'fs'
import path from 'path'
import untildify from 'untildify'
import { pipe, split, map, apply, trim, startsWith, reject } from 'ramda'

const { DIR_PATH, FILENAME } = process.env

const bookmarks = pipe(
  apply(path.join),
  untildify,
  (filepath) => fs.readFileSync(filepath, 'utf-8'),
  trim,
  split(/\r?\n/),
  reject(startsWith('#')),
  map(pipe(split('|'), map(trim))),
  map(([title, match, url]) => ({
    title,
    subtitle: url,
    arg: url,
    match,
  })),
)([DIR_PATH, FILENAME])

alfy.output(bookmarks)
