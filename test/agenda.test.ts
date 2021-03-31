import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'agenda/dist/job';
import { Agenda, AgendaModule } from '../src';

describe('agenda module - use forRoot', () => {
  let agenda: Agenda;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AgendaModule.forRoot({
          db: {
            address: 'mongodb://localhost/agenda-test',
            collection: 'agenda',
            options: {},
          },
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
