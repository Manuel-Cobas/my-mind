import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

import { POSTGRES_DSOURCE } from 'src/database/data-sources';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [POSTGRES_DSOURCE],
  },
];
