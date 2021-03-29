import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'agenda/dist/job';
import path from 'path';
import { AgendaModule } from '../src';
import { Agenda } from '../src/agenda/interfaces';
import env from './env';

describe('agenda module - use forRootAsync', () => {
  let agenda: Agenda;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AgendaModule.forRootAsync({
          imports: [
            ConfigModule.forRoot({
              envFilePath: [path.resolve(__dirname, '.test.env')],
              load: [env],
            }),
          ],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            db: {
              address: config.get<string>('db.url', ''),
              collection: config.get<string>('db.collection', ''),
              options: {},
            },
          }),
        }),
      ],
    }).compile();

    agenda = await module.resolve(Agenda);

    await agenda.start();
  });

  it('works', async done => {
    agenda.define('test2', (job: Job) => {
      try {
        expect(job.attrs.data!.num).toEqual(2);
        done();
      } catch (err) {
        done(err);
      }
    });

    await agenda.schedule('in 2 seconds', ['test2'], { num: 2 });
  });

  afterEach(async () => {
    await agenda.stop();
    await agenda.close({ force: true });
  });
});
