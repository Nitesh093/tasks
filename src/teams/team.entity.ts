// src/teams/team.entity.ts
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Team {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  members: string[]; // Assuming members are represented by their IDs
}
