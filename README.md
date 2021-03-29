# nestjs-agenda

[agenda](https://github.com/agenda/agenda) module for [nestjs](https://nestjs.com/)

## Install

```bash
npm i @ccmos/nestjs-agenda
```

## Usage

```typescript
// module

@Module({
  imports: [
    AgendaModule.forRoot({
      db: {
        address: 'mongodb://localhost/agenda-test',
        collection: 'agenda',
        options: {},
      },
    }),
  ],
})
export class AppModule {}

// service
@Injectable()
export class SomeService implement OnModuleInit {
  constructor(private agenda: Agenda) {}

  async onModuleInit() {
    // must start before schedule
    await this.agenda.start();
  }

  async doSomething() {
    agenda.define('test2', (job: Job) => {
      console.log(job.attrs.data?.num); // print 2
    });

    await agenda.schedule('in 2 seconds', ['test2'], { num: 2 });
  }
}
```

or use with config

```typescript
@Module({
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
})
export class AppModule {}
```
