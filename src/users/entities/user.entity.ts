import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('text', { default: [], array: true })
  tokens: string[];

  @OneToMany(() => Profile, (profile) => profile.user)
  profiles: Profile[];
}
