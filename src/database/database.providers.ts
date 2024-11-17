import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

import { POSTGRES_DSOURCE } from './data-sources';
import { Profile } from 'src/profiles/entities/profile.entity';

export const databaseProviders = [
  {
    provide: POSTGRES_DSOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Bingo.2011',
        database: 'mymind',
        entities: [User, Profile],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
