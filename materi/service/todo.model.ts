/** @module todoSchema */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * todo model
 */
@Entity({
  name: 'Todo',
})
export class Todo {
  /**
   * id of a todo
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * task description
   */
  @Column({
    type: 'varchar',
    length: 255,
  })
  task: string;

  /**
   * true when task are done
   */
  @Column({
    type: 'boolean',
    default: false,
  })
  done: boolean;
}
